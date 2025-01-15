import { Box, Container, Flex, Stack, Text, Image, Separator, IconButton } from "@chakra-ui/react";
import { Link } from "react-router";
import { FaFacebook, FaGithubAlt, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { GooglePlay } from "../assets";

const Footer = () => {
    return (
        <Box py={8} fontSize={{ base: "xs", md: "sm" }}>
            <Separator pb={8} />
            <Container maxW="6xl">
                <Flex direction={{ base: "column", md: "row" }} justify="space-between">
                    {/* Company Section */}
                    <Stack gap={4} mb={{ base: 8, md: 0 }}>
                        <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
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
                        <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
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
                        <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
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
                        <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                            Install App
                        </Text>
                        <Stack gap={2}>
                            <Image
                                src={GooglePlay}
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
                        gap={4}
                    >
                        <Box>
                            <Text fontSize={{ base: "xs", md: "sm" }}>
                                © Copyright {new Date().getFullYear()}, All Rights Reserved by Nexhub Labs.
                            </Text>
                            <Text fontSize={{ base: "xs" }}>
                                Key<Box as="span" color="green.400">Vault</Box> <Box as="span" opacity={0.7}>is your trusted app for password generation, secure storage, and easy retrieval.</Box>
                            </Text>
                        </Box>
                        <Stack direction="row" gap={4}>
                            <IconButton
                                variant={"ghost"}
                                as="a"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                children={<FaXTwitter href="https://twitter.com/NexhubLabs" target="_blank" />}
                                fontSize={{ base: "sm", md: "xl" }}
                                _hover={{ scale: 1.1 }}
                            />
                            <IconButton
                                variant={"ghost"}
                                as="a"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                children={<FaFacebook href="https://www.facebook.com/nexhub.labs" target="_blank" />}
                                fontSize={{ base: "sm", md: "xl" }}
                                _hover={{ scale: 1.1 }}
                            />
                            <IconButton
                                variant={"ghost"}
                                as="a"
                                rel="noopener noreferrer"
                                aria-label="Linkedin"
                                children={<FaInstagram href="https://www.linkedin.com/company/nexhub-labs" />}
                                fontSize={{ base: "sm", md: "xl" }}
                                _hover={{ scale: 1.1 }}
                            />
                            <IconButton
                                variant={"ghost"}
                                as="a"
                                rel="noopener noreferrer"
                                aria-label="Linkedin"
                                children={<FaGithubAlt href="https://www.linkedin.com/company/nexhub-labs" />}
                                fontSize={{ base: "sm", md: "xl" }}
                                _hover={{ scale: 1.1 }}
                            />
                        </Stack>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
