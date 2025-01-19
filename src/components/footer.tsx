import { Box, Container, Flex, Stack, Text, Image, Separator, IconButton } from "@chakra-ui/react";
import { Link } from "react-router";
import { FaFacebook, FaGithubAlt, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { GooglePlay } from "../assets";
import { motion } from "motion/react";

const MotionIcon = motion.create(IconButton);

const Footer = () => {
    return (
        <Box py={8} fontSize={{ base: "xs", md: "sm" }}>
            <Separator pb={8} />
            <Container maxW={"6xl"}>
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
                        <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }}>
                            KeyVault is available on Android and iOS
                        </Text>
                        <Stack gap={2}>
                            <Image
                                border={"2px solid #ffffff70"}
                                rounded={"lg"}
                                src={GooglePlay}
                                alt="Google Play"
                                width="140px"
                            />
                            <Image
                                border={"1px solid #ffffff70"}
                                rounded={"lg"}
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
                        <Stack direction="row" gap={2}>
                            <Link to="https://twitter.com/NexhubLabs" target="_blank" rel="noopener noreferrer">
                                <MotionIcon
                                    variant={"ghost"}
                                    aria-label="Twitter"
                                    children={<FaXTwitter />}
                                    fontSize={{ base: "sm", md: "xl" }}
                                    whileHover={{ scale: 1.2 }}
                                />
                            </Link>
                            <Link to="https://www.facebook.com/nexhub.labs" target="_blank" rel="noopener noreferrer">
                                <MotionIcon
                                    variant={"ghost"}
                                    aria-label="Facebook"
                                    children={<FaFacebook />}
                                    fontSize={{ base: "sm", md: "xl" }}
                                    whileHover={{ scale: 1.2 }}
                                />
                            </Link>
                            <Link to="https://www.linkedin.com/company/nexhub-labs" target="_blank" rel="noopener noreferrer">
                                <MotionIcon
                                    variant={"ghost"}
                                    aria-label="Linkedin"
                                    children={<FaInstagram />}
                                    fontSize={{ base: "sm", md: "xl" }}
                                    whileHover={{ scale: 1.2 }}
                                />
                            </Link>
                            <Link to="https://www.linkedin.com/company/nexhub-labs" target="_blank" rel="noopener noreferrer">
                                <MotionIcon
                                    variant={"ghost"}
                                    aria-label="Linkedin"
                                    children={<FaGithubAlt />}
                                    fontSize={{ base: "sm", md: "xl" }}
                                    whileHover={{ scale: 1.2 }}
                                />
                            </Link>
                        </Stack>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
