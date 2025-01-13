import {
    Box,
    Button,
    Drawer,
    Flex,
    Heading,
    HStack,
    IconButton,
    Separator,
    VStack
} from "@chakra-ui/react";
import { LuMoon, LuSun, LuMenu, LuX } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Link } from "react-router";

export const ColorModeToggle = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <IconButton
            aria-label="Toggle Color Mode"
            children={useColorModeValue(<LuSun />, <LuMoon />)}
            onClick={toggleColorMode}
            rounded="full"
            width={"fit"}
            size="sm"
            variant="ghost"
            _hover={{ transform: "rotate(180deg)" }}
            transition="all 0.3s ease"
        />
    );
};

const DesktopMenu = ({ menuItems }: { menuItems: { label: string; path: string; }[]; }) => (
    <HStack spaceX={4} display={{ base: "none", md: "flex" }}>
        {menuItems.map((item) => (
            <Link to={item.path} key={item.label}>
                <Button variant="ghost">{item.label}</Button>
            </Link>
        ))}
        <ColorModeToggle />
    </HStack>
);

const MobileMenu = ({ menuItems }: { menuItems: { label: string; path: string; }[]; }) => {
    return (
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <IconButton
                    aria-label="Open Menu"
                    children={<LuMenu />}
                    display={{ base: "flex", md: "none" }}
                    variant="ghost"
                    size="md"
                />
            </Drawer.Trigger>
            <Drawer.Backdrop />
            <Drawer.Content h={"99vh"} rounded="md" top={0.5} right={0} position="fixed" zIndex="9999">
                <Drawer.Header p={6}>
                    <HStack justifyContent={"space-between"}>
                        <Drawer.Title>FO</Drawer.Title>
                        <Drawer.CloseTrigger children={<LuX />} />
                    </HStack>
                </Drawer.Header>
                <Separator />
                <Drawer.Body p={4}>
                    <VStack align="stretch" spaceY={2}>
                        {menuItems.map((item) => (
                            <Link to={item.path} key={item.label}>
                                <Button variant="ghost" width={"full"} justifyContent="flex-start">
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                        <ColorModeToggle />
                    </VStack>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    );
};

export const Navbar = () => {
    const menuItems = [
        { label: "Generator Core", path: "/core/generate" },
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
                <Heading size="lg" as="h1" fontWeight="bold" color={"gray.600"}>
                    Key<Box as="span" color="green.400">Vault</Box>
                </Heading>
            </Link>
            <DesktopMenu menuItems={menuItems} />
            <MobileMenu menuItems={menuItems} />
        </Flex>
    );
};
