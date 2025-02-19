import {
    Container,
    Button,
    Text,
    Box,
    Stack,
    Fieldset,
    CheckboxGroup,
    Table,
    HStack,
    IconButton,
    Spacer,
    ClipboardIndicator,
    ClipboardTrigger,
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    Field,
    Input,
    DialogBackdrop,
    Span,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { LuCheck, LuChevronLeft, LuChevronRight, LuClipboard, LuRefreshCw, LuTrash2 } from "react-icons/lu";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Checkbox } from "../../components/ui/checkbox";
import { ClipboardRoot } from "../../components/ui/clipboard";
import { generatePassword } from "../../utils/generator";
import { useColorModeValue } from "../../components/ui/color-mode";
import { cloudGenerate } from "../../api";
import DecryptedText from "../../components/DecryptedText/DecryptedText";

// Define a type for the keys
type LoadingKeys = 'loading'; // Add other keys as needed

const PWGenerator = () => {

    const [password, setPassword] = useState<string>("");
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeDigits, setIncludeDigits] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [storedPasswords, setStoredPasswords] = useState<string[]>([]);
    const itemsPerPage = 5;

    const [loadingData, setLoadingData] = useState<{ [key in LoadingKeys]: boolean }>({
        loading: false,
    });

    const setLoading = (key: LoadingKeys, value: boolean) => {
        setLoadingData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    // Utility function to safely parse JSON
    const safeJsonParse = (value: string, fallback: any) => {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : fallback; // Ensure it's an array
        } catch {
            return fallback;
        }
    };

    const [selectedPasswords, setSelectedPasswords] = useState<Record<string, boolean>>({});
    const [favoritePasswords, setFavoritePasswords] = useState<
        { password: string; label: string; usernameOrEmail?: string; }[]
    >(() =>
        safeJsonParse(localStorage.getItem("favoritePasswords") || "[]", [])
    );

    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    const [activeUsernameOrEmail, setActiveUsernameOrEmail] = useState<string | null>(null);

    const saveFavoritePassword = (
        password: string,
        label: string,
        usernameOrEmail?: string
    ) => {
        const updatedFavorites = [
            ...favoritePasswords,
            { password, label, usernameOrEmail },
        ];
        setFavoritePasswords(updatedFavorites);
        localStorage.setItem("favoritePasswords", JSON.stringify(updatedFavorites));
    };

    const removeFavoritePassword = (password: string) => {
        const updatedFavorites = favoritePasswords.filter(
            (fp) => fp.password !== password
        );
        setFavoritePasswords(updatedFavorites);
        localStorage.setItem("favoritePasswords", JSON.stringify(updatedFavorites));
    };

    const handleGenerate = async () => {
        setLoading('loading', true);
        let timeoutId: number | undefined;

        const localPromise = new Promise<string>((resolve) => {
            timeoutId = window.setTimeout(() => {
                const localPassword = handleLocalGenerate();
                resolve(localPassword);
            }, 500);
        });

        try {
            const cloudPasswordPromise = handleCloudGenerate();
            // Race between cloud and local generation
            const cloudPassword = await Promise.race([cloudPasswordPromise, localPromise]);
            // console.info("Cloud password generated");
            setPassword(cloudPassword);
        } catch (error) {
            console.error(error);
            const localPassword = await localPromise;
            setPassword(localPassword);
        } finally {
            window.clearTimeout(timeoutId);
            setLoading('loading', false);
        }
    };

    const handleLocalGenerate = () => {
        const newPassword = generatePassword({
            includeUppercase, includeLowercase, includeDigits, includeSymbols
        });
        return newPassword;
    };

    const handleCloudGenerate = async () => {
        const newPassword = await cloudGenerate({
            includeUppercase, includeLowercase, includeDigits, includeSymbols
        });
        return newPassword;
    };

    const [activeDialogPassword, setActiveDialogPassword] = useState<string | null>(null);

    // A helper function to count selected items
    const selectedCount = Object.values(selectedPasswords).filter(Boolean).length;

    useEffect(() => {
        // Update localStorage whenever favoritePasswords changes
        localStorage.setItem("favoritePasswords", JSON.stringify(favoritePasswords));
    }, [favoritePasswords]); // Dependency array to track changes in favoritePasswords

    useEffect(() => {
        // Retrieve stored passwords from localStorage
        const passwords = safeJsonParse(localStorage.getItem("generatedPasswords") || "[]", []);
        setStoredPasswords(passwords);
        if (passwords.length > 0) {
            setPassword(passwords[0]);
        }
    }, []);

    useEffect(() => {
        if (password) {
            const updatedPasswords = [password, ...storedPasswords.filter(p => p !== password)];
            setStoredPasswords(updatedPasswords);
            localStorage.setItem("generatedPasswords", JSON.stringify(updatedPasswords));
        }
    }, [password]);

    return (
        <>
            <Container maxW="container.lg" py={6} overflow="hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Core Generator</Text>
                </motion.div>
                <Stack justifyContent="center" alignItems="center" gap={4}>
                    <Fieldset.Root textAlign={"center"} justifyContent="center" alignItems="center">
                        <CheckboxGroup defaultValue={["uppercase", "lowercase", "digits", "symbols"]} name="keyConfig">
                            <Fieldset.Legend fontSize="xs" mb="2">
                                Modify key configuration
                            </Fieldset.Legend>
                            <Fieldset.Content>
                                <Stack colorPalette={"green"} direction="row" gap={2} wrap={"wrap"}>
                                    <Checkbox size={"xs"} variant={"subtle"} checked={includeUppercase} onCheckedChange={(e) => setIncludeUppercase(!!e.checked)} value="uppercase">Uppercase</Checkbox>
                                    <Checkbox size={"xs"} variant={"subtle"} checked={includeLowercase} onCheckedChange={(e) => setIncludeLowercase(!!e.checked)} value="lowercase">Lowercase</Checkbox>
                                    <Checkbox size={"xs"} variant={"subtle"} checked={includeDigits} onCheckedChange={(e) => setIncludeDigits(!!e.checked)} value="digits">Digits</Checkbox>
                                    <Checkbox size={"xs"} variant={"subtle"} checked={includeSymbols} onCheckedChange={(e) => setIncludeSymbols(!!e.checked)} value="symbols">Symbols</Checkbox>
                                </Stack>
                            </Fieldset.Content>
                        </CheckboxGroup>
                        <Stack direction={"row"} alignItems={"center"} gap={-4}>
                            <Stack direction={"row"} alignItems={"center"} position={"relative"} w="fit">
                                <Input alignItems={"center"} justifyItems={"center"} w="fit" h="fit" p={3} pr={16} asChild>
                                    <Span fontSize={"lg"} fontFamily={"monospace"}>
                                        <DecryptedText animateOn="view" className="" revealDirection="end" text={password} />
                                    </Span>
                                </Input>
                                <IconButton disabled={loadingData.loading} className={`${loadingData.loading && "animate-spin"}`} colorPalette={"green"} position={"absolute"} right={2} variant={"plain"} size={"2xs"} as={LuRefreshCw} onClick={async () => await handleGenerate()} />
                            </Stack>
                            {
                                password && (
                                    <ClipboardRoot value={password} timeout={3000}>
                                        <ClipboardTrigger asChild>
                                            <IconButton size={"xs"} variant="plain">
                                                <ClipboardIndicator copied={<LuCheck />}>
                                                    <LuClipboard />
                                                </ClipboardIndicator>
                                            </IconButton>
                                        </ClipboardTrigger>
                                    </ClipboardRoot>
                                )
                            }
                        </Stack>
                    </Fieldset.Root>

                    {storedPasswords.length > 0 && (
                        <Box p={6} borderRadius="lg" shadow="sm" w="full">
                            <Text fontSize={"sm"} fontWeight="semibold">
                                Previously Generated Passwords
                            </Text>
                            <HStack justify="space-between" mb={4}>
                                <Spacer display={{ base: "none", lg: "block" }} />
                                <HStack spaceX={2}>
                                    {selectedCount > 0 && (
                                        <Button
                                            size="xs"
                                            colorScheme="red"
                                            onClick={() => {
                                                setStoredPasswords(prev =>
                                                    prev.filter(pwd => !selectedPasswords[pwd])
                                                );
                                                setSelectedPasswords({});
                                                localStorage.setItem(
                                                    "generatedPasswords",
                                                    JSON.stringify(storedPasswords.filter(pwd => !selectedPasswords[pwd]))
                                                );
                                            }}
                                        >
                                            <LuTrash2 /> Delete Selected ({selectedCount})
                                        </Button>
                                    )}
                                    {
                                        storedPasswords.length >= 2 && (
                                            <Button
                                                size="xs"
                                                variant="outline"
                                                colorScheme="red"
                                                onClick={() => {
                                                    setStoredPasswords([]);
                                                    setSelectedPasswords({});
                                                    localStorage.setItem("generatedPasswords", "[]");
                                                }}
                                            >
                                                Clear All
                                            </Button>
                                        )
                                    }
                                </HStack>
                            </HStack>

                            <Table.Root data-state="open"
                                _open={{
                                    animationName: "fade-in, scale-in",
                                    animationDuration: "300ms",
                                }}
                                _closed={{
                                    animationName: "fade-out, scale-out",
                                    animationDuration: "120ms",
                                }} variant="line" size="sm" fontSize={"xs"} w={"full"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>
                                            <Checkbox variant={"subtle"}
                                                checked={
                                                    storedPasswords.length > 0 &&
                                                    storedPasswords.every(pwd => selectedPasswords[pwd])
                                                }
                                                onCheckedChange={(e) => {
                                                    // Simply create an empty object when unchecking
                                                    setSelectedPasswords(e.checked ?
                                                        storedPasswords.reduce((acc: {}, pwd: string) => ({ ...acc, [pwd]: true }), {})
                                                        : {}
                                                    );
                                                }}
                                            />
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader>Password</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {storedPasswords
                                        .slice(
                                            (currentPage - 1) * itemsPerPage,
                                            currentPage * itemsPerPage
                                        )
                                        .map((pwd, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    <Checkbox variant={"subtle"}
                                                        checked={!!selectedPasswords[pwd]}
                                                        onCheckedChange={(e) => {
                                                            setSelectedPasswords(prev => {
                                                                const next = { ...prev };
                                                                if (e.checked) {
                                                                    next[pwd] = true;
                                                                } else {
                                                                    delete next[pwd]; // Remove key instead of setting to false
                                                                }
                                                                return next;
                                                            });
                                                        }}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell fontFamily="mono">{pwd}</Table.Cell>
                                                <Table.Cell>
                                                    <HStack spaceX={2} justify="flex-end">
                                                        <IconButton
                                                            aria-label={
                                                                favoritePasswords.some((fp) => fp.password === pwd)
                                                                    ? "Remove from favorites"
                                                                    : "Add to favorites"
                                                            }
                                                            title={
                                                                favoritePasswords.some((fp) => fp.password === pwd)
                                                                    ? "Remove from favorites"
                                                                    : "Add to favorites"
                                                            }
                                                            children={
                                                                favoritePasswords.some((fp) => fp.password === pwd) ? (
                                                                    <BsHeartFill />
                                                                ) : (
                                                                    <BsHeart />
                                                                )
                                                            }
                                                            size="xs"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                if (favoritePasswords.some((fp) => fp.password === pwd)) {
                                                                    removeFavoritePassword(pwd); // Remove directly
                                                                } else {
                                                                    setActiveDialogPassword(pwd); // Open modal to add details
                                                                }
                                                            }}
                                                        />
                                                        <ClipboardRoot value={pwd} timeout={3000}>
                                                            <ClipboardTrigger asChild>
                                                                <IconButton size={"xs"} variant="ghost">
                                                                    <ClipboardIndicator copied={<LuCheck />}>
                                                                        <LuClipboard />
                                                                    </ClipboardIndicator>
                                                                </IconButton>
                                                            </ClipboardTrigger>
                                                        </ClipboardRoot>
                                                    </HStack>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                </Table.Body>
                            </Table.Root>

                            <HStack justify="center" mt={4} spaceX={4} display={storedPasswords.length > itemsPerPage ? "flex" : "none"}>
                                <IconButton
                                    aria-label="Previous page"
                                    children={<LuChevronLeft />}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    size="xs"
                                />
                                <Text fontSize="xs">
                                    Page {currentPage} of{' '}
                                    {Math.ceil(storedPasswords.length / itemsPerPage)}
                                </Text>
                                <IconButton
                                    aria-label="Next page"
                                    children={<LuChevronRight />}
                                    onClick={() =>
                                        setCurrentPage(prev =>
                                            Math.min(prev + 1, Math.ceil(storedPasswords.length / itemsPerPage))
                                        )
                                    }
                                    disabled={
                                        currentPage === Math.ceil(storedPasswords.length / itemsPerPage)
                                    }
                                    size="xs"
                                />
                            </HStack>
                        </Box>
                    )}
                </Stack>
            </Container>

            <DialogRoot
                role="alertdialog"
                motionPreset="slide-in-bottom"
                modal
                open={!!activeDialogPassword}
                onOpenChange={(e) => {
                    if (!e.open) setActiveDialogPassword(null);
                }}
                onExitComplete={() => {
                    setActiveLabel(null);
                    setActiveUsernameOrEmail(null);
                    setActiveDialogPassword(null);
                }}
                closeOnInteractOutside
                unmountOnExit
            >
                <DialogBackdrop bg={useColorModeValue("whiteAlpha.500", "blackAlpha.500")} />
                <DialogContent
                    bg={"transparent"}
                    backdropFilter={"saturate(180%) blur(50px)"}
                    maxWidth="md"
                    mx="auto"
                    my="auto"
                    position="fixed"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                >
                    <DialogHeader>
                        <DialogTitle>Add Favorite Details</DialogTitle>
                    </DialogHeader>
                    <DialogBody spaceY={4}>
                        <Field.Root spaceY={2}>
                            <Input
                                required
                                size="sm"
                                variant={"flushed"}
                                placeholder="Label (e.g., Spotify Login)"
                                onChange={(e) => setActiveLabel(e.target.value)} // Track label input
                            />
                            <Input
                                required={false}
                                size="sm"
                                variant={"flushed"}
                                placeholder="Username/Email (optional)"
                                onChange={(e) => setActiveUsernameOrEmail(e.target.value)} // Track username/email input
                            />
                        </Field.Root>
                        <Text className="font-mono" fontSize="xl">
                            {activeDialogPassword}
                        </Text>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button
                            type="submit"
                            bg="green.400"
                            color="white"
                            variant="solid"
                            onClick={() => {
                                if (!activeLabel || !activeDialogPassword) {
                                    alert("Please provide a label and ensure the password is generated.");
                                    return;
                                }
                                saveFavoritePassword(
                                    activeDialogPassword!,
                                    activeLabel,
                                    activeUsernameOrEmail || undefined
                                );
                                setActiveDialogPassword(null);
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </>
    );
};

export default PWGenerator;