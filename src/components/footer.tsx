import { Box, Container, Flex, Stack, Text, Image, Separator } from "@chakra-ui/react";
import { LuFacebook, LuGithub, LuInstagram } from "react-icons/lu";
import { Link } from "react-router";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <Box py={8}>
            <Separator pb={8} />
            <Container maxW="6xl">
                <Flex direction={{ base: "column", md: "row" }} justify="space-between">
                    {/* Company Section */}
                    <Stack gap={4} mb={{ base: 8, md: 0 }}>
                        <Text fontWeight="bold" fontSize="lg">
                            Company
                        </Text>
                        <Stack gap={2}>
                            <Link to="#" className="hover:underline underline-offset-4">
                                About KeyVault
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Key Features
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                How It Works
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Careers at Nexhub Labs
                            </Link>
                        </Stack>
                    </Stack>

                    {/* Help Section */}
                    <Stack gap={4} mb={{ base: 8, md: 0 }}>
                        <Text fontWeight="bold" fontSize="lg">
                            Help
                        </Text>
                        <Stack gap={2}>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Support Center
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Security Details
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Terms of Service
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Privacy & Data Policy
                            </Link>
                        </Stack>
                    </Stack>

                    {/* Resources Section */}
                    <Stack gap={4} mb={{ base: 8, md: 0 }}>
                        <Text fontWeight="bold" fontSize="lg">
                            Resources
                        </Text>
                        <Stack gap={2}>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Password Security Guides
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Development Tutorials
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                Secure Password Tips Blog
                            </Link>
                            <Link to="#" className="hover:underline underline-offset-4">
                                KeyVault Tutorials on YouTube
                            </Link>
                        </Stack>
                    </Stack>

                    {/* Install App Section */}
                    <Stack gap={4}>
                        <Text fontWeight="bold" fontSize="lg">
                            Install App
                        </Text>
                        <Stack gap={2}>
                            <Image
                                src="/brand-logos/google-play-png-logo-3799.png"
                                alt="Google Play"
                                width="140px"
                            />
                            <Image
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                width="140px"
                            />
                        </Stack>
                    </Stack>
                </Flex>

                {/* Footer Bottom */}
                <Box mt={8} borderTopWidth={1} borderColor="gray.700" pt={4}>
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        justify="space-between"
                        align="center"
                    >
                        <Text fontSize="sm">
                            © Copyright 2022, All Rights Reserved by Nexhub Labs. KeyVault -
                            Your trusted app for password generation, secure storage, and easy retrieval.
                        </Text>
                        <Stack direction="row" gap={4}>
                            <Link to="#">
                                <FaXTwitter width="34px" />
                            </Link>
                            <Link to="#">
                                <LuFacebook width="34px" />
                            </Link>
                            <Link to="#">
                                <LuInstagram width="34px" />
                            </Link>
                            <Link to="#">
                                <LuGithub width="34px" />
                            </Link>
                        </Stack>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
