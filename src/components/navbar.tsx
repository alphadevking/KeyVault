import { forwardRef, useRef } from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Separator,
    Stack,
} from "@chakra-ui/react";
import { LuMoon, LuSun, LuMenu, LuX, LuUserRound } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Link } from "react-router";
import useAuthStore from "../store/authStore";
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import {
    MenuContent,
    MenuItem,
    MenuItemCommand,
    MenuTrigger,
    MenuRoot,
} from "./ui/menu";

// SignInStatus component now forwards its ref as HTMLDivElement.
const SignInStatus = forwardRef<HTMLDivElement, {}>((_props, ref) => {
    const { user, logout } = useAuthStore();

    if (user) {
        return (
            <MenuRoot positioning={{ placement: "bottom-end" }}>
                <MenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <LuUserRound />
                    </Button>
                </MenuTrigger>
                <MenuContent portalRef={ref as any} fontSize={"xs"}>
                    {user?.name && (
                        <MenuItem value="name">
                            {user?.name}
                        </MenuItem>
                    )}
                    <MenuItem value="email">
                        {user?.email}
                    </MenuItem>
                    <MenuItem value="logout" color={"red.500"} onClick={logout}>
                        Logout <MenuItemCommand>⌘E</MenuItemCommand>
                    </MenuItem>
                </MenuContent>
            </MenuRoot>
        );
    }
    return (
        <Link to="/login">
            <Button variant="outline" size="sm">
                Sign In
            </Button>
        </Link>
    );
});
SignInStatus.displayName = "SignInStatus";

export const ColorModeToggle = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <IconButton
            aria-label="Toggle Color Mode"
            children={useColorModeValue(<LuSun />, <LuMoon />)}
            onClick={toggleColorMode}
            rounded="full"
            width="fit"
            size="sm"
            variant="ghost"
            _hover={{ transform: "rotate(180deg)" }}
            transition="all 0.3s ease"
        />
    );
};

const DesktopMenu = ({ menuItems }: { menuItems: { label: string; path: string; }[]; }) => (
    <HStack gap={4} display={{ base: "none", md: "flex" }}>
        {menuItems.map((item) => (
            <Link to={item.path} key={item.label}>
                <Button variant="ghost">{item.label}</Button>
            </Link>
        ))}
        <SignInStatus />
        <ColorModeToggle />
    </HStack>
);

const MobileMenu = ({ menuItems }: { menuItems: { label: string; path: string; }[]; }) => {
    // drawerRef is now typed as HTMLDivElement.
    const drawerRef = useRef<HTMLDivElement>(null);

    return (
        <DrawerRoot>
            <DrawerTrigger asChild>
                <IconButton
                    aria-label="Open Menu"
                    children={<LuMenu />}
                    display={{ base: "flex", md: "none" }}
                    variant="ghost"
                    size="md"
                />
            </DrawerTrigger>
            <DrawerBackdrop />
            <DrawerContent ref={drawerRef} rounded="sm">
                <DrawerHeader p={6}>
                    <HStack justifyContent="space-between">
                        <DrawerTitle>
                            <Flex direction="row" justify="center" align="center">
                                <Image src="/kv_outline.svg" alt="Logo" boxSize={8} objectFit="contain" />
                                <Heading size="lg" as="h1" fontWeight="bold" color="gray.600">
                                    Key<Box as="span" color="green.400">Vault</Box>
                                </Heading>
                            </Flex>
                        </DrawerTitle>
                        <DrawerCloseTrigger children={<LuX />} />
                    </HStack>
                </DrawerHeader>
                <Separator />
                <DrawerBody p={4}>
                    <Stack align="stretch" gap={2}>
                        {menuItems.map((item) => (
                            <Link to={item.path} key={item.label}>
                                <Button variant="ghost" width="full" justifyContent="flex-start">
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                        {/* Pass the same drawerRef as the portalRef */}
                        <SignInStatus ref={drawerRef} />
                        <ColorModeToggle />
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </DrawerRoot>
    );
};

export const Navbar = () => {
    const menuItems = [
        { label: "Generator Core", path: "/gen" },
    ];

    return (
        <Flex
            as="nav"
            justify="space-between"
            align="center"
            px={{ base: 4, md: 8 }}
            py={4}
            position="sticky"
            top="0"
            zIndex="10"
            backdropFilter="saturate(180%) blur(10px)"
        >
            <Link to="/">
                <Flex direction="row" justify="center" align="center">
                    <Image src="/kv_outline.svg" alt="Logo" boxSize={8} objectFit="contain" />
                    <Heading size="lg" as="h1" fontWeight="bold" color="gray.600">
                        Key<Box as="span" color="green.400">Vault</Box>
                    </Heading>
                </Flex>
            </Link>
            <DesktopMenu menuItems={menuItems} />
            <MobileMenu menuItems={menuItems} />
        </Flex>
    );
};
