import {
    Container,
    Grid,
    GridItem,
    Button,
    Text,
    Box,
    VStack,
    Fieldset,
    CheckboxGroup,
    Table,
    HStack,
    IconButton,
    Spacer,
    ClipboardIndicator,
    ClipboardTrigger,
    Flex,
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
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { LuCheck, LuChevronLeft, LuChevronRight, LuClipboard, LuTrash2 } from "react-icons/lu";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Checkbox } from "../../../components/ui/checkbox";
import { ClipboardButton, ClipboardRoot } from "../../../components/ui/clipboard";
import { generatePassword } from "../../../utils/generator";
import { useColorModeValue } from "../../../components/ui/color-mode";
import { cloudGenerate } from "../../../api";

const PWGenerator = () => {

    const [password, setPassword] = useState<string>("");
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeDigits, setIncludeDigits] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [storedPasswords, setStoredPasswords] = useState<string[]>([]);
    const itemsPerPage = 5;

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
        let timeoutId: number | undefined;

        const localPromise = new Promise<string>((resolve) => {
            timeoutId = window.setTimeout(() => {
                const localPassword = handleLocalGenerate();
                resolve(localPassword);
            }, 500);
        });

        try {
            const cloudPasswordPromise = handleCloudGenerate();
            const cloudPassword = await Promise.race([cloudPasswordPromise, localPromise]);
            setPassword(cloudPassword);
        } catch (error) {
            console.error(error);
            const localPassword = await localPromise;
            setPassword(localPassword);
        } finally {
            window.clearTimeout(timeoutId);
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
                    <Text fontSize="2xl" fontWeight="bold">Core Generator</Text>
                </motion.div>
                <Flex justifyContent="center" alignItems="start" gap={4} flexDirection={{ base: "column", md: "row" }}>
                    <Box
                        p={6}
                        borderRadius="lg"
                        boxShadow="lg"
                        textAlign="center"
                        w={{ base: "100%", md: "60%" }}
                    >
                        <VStack mt={4}>
                            <Fieldset.Root textAlign={"left"}>
                                <CheckboxGroup defaultValue={["uppercase", "lowercase", "digits", "symbols"]} name="keyConfig">
                                    <Fieldset.Legend fontSize="sm" mb="2">
                                        Modify key configuration
                                    </Fieldset.Legend>
                                    <Fieldset.Content>
                                        <Checkbox variant={"subtle"} checked={includeUppercase} onCheckedChange={(e) => setIncludeUppercase(!!e.checked)} value="uppercase">Uppercase</Checkbox>
                                        <Checkbox variant={"subtle"} checked={includeLowercase} onCheckedChange={(e) => setIncludeLowercase(!!e.checked)} value="lowercase">Lowercase</Checkbox>
                                        <Checkbox variant={"subtle"} checked={includeDigits} onCheckedChange={(e) => setIncludeDigits(!!e.checked)} value="digits">Digits</Checkbox>
                                        <Checkbox variant={"subtle"} checked={includeSymbols} onCheckedChange={(e) => setIncludeSymbols(!!e.checked)} value="symbols">Symbols</Checkbox>
                                    </Fieldset.Content>
                                </CheckboxGroup>
                            </Fieldset.Root>
                        </VStack>
                        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} mt={4}>
                            <GridItem>
                                <Button bgBlendMode={"overlay"} onClick={async () => await handleGenerate()} w="full">
                                    Generate Password
                                </Button>
                            </GridItem>
                        </Grid>

                        {password && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Box mt={6} p={4} borderRadius="md" wordBreak="break-all">
                                    <Text fontSize="xl" mb={2}>{password}</Text>
                                    <ClipboardRoot value={password} timeout={3000}>
                                        <ClipboardButton />
                                    </ClipboardRoot>
                                </Box>
                            </motion.div>
                        )}
                    </Box>

                    {storedPasswords.length > 0 && (
                        <Box p={6} borderRadius="lg" boxShadow="md" w={{ base: "100%", md: "40%" }}>
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
                                        storedPasswords.length > 0 && (
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

                            <Table.Root variant="line" size="sm" fontSize={"xs"} w={"full"}>
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
                </Flex>
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