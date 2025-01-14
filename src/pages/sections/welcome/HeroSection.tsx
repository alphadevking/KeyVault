import React from "react";
import { Box, Button, Grid, Heading, Text, Flex, Image } from "@chakra-ui/react";
import { motion } from "motion/react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { Link } from "react-router";

// Chakra + Motion Integration
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);
const MotionLink = motion.create(Link);

const HeroSection: React.FC = () => {
    return (
        <Flex
            as="section"
            direction={{ base: "column", lg: "row" }}
            height="100vh"
            px={{ base: 6, lg: 12 }}
            py={8}
            gap={5}
        >
            {/* Left Section - Text Content */}
            <Flex
                direction="column"
                justify="center"
                flex="1"
                letterSpacing="tighter"
                textAlign={{ base: "center", lg: "left" }}
                mb={{ base: 10, lg: 0 }}
            >
                <MotionHeading
                    fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}
                    mb={2}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    lineHeight={{ base: 1.2, md: 1.0, lg: 1.0 }}
                    className="font-faustina"
                >
                    Secure your <Box as="span" color="green.400">digital life</Box> with{" "}
                    <Box as="span" color="green.400">KeyVault</Box>.
                </MotionHeading>

                <MotionText
                    fontSize={{ base: "lg", md: "xl" }}
                    maxW="2xl"
                    mb={6}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    KeyVault is the ultimate solution for securely generating, storing,
                    and managing your passwords and passkeys. Say goodbye to weak
                    passwords and hello to robust security.
                </MotionText>

                <MotionLink
                    to={"/core/generate"}
                >
                    <MotionButton
                        colorScheme="green"
                        size={"md"}
                        className="group"
                        variant={"solid"}
                        bg={"green.400"}
                        color={"white"}
                        _hover={{ bg: "green.500", outline: "4px dashed", outlineColor: "green.400" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        w={"fit-content"}
                        mx={{ base: "auto", lg: 0 }}
                    >
                        Start Free Trial <LuArrowRightFromLine className="group-hover:ml-2 transition-all" />
                    </MotionButton>
                </MotionLink>
            </Flex>

            {/* Right Section - Grid of Animated Blocks */}
            <Grid
                templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                templateRows={{ base: "repeat(4, 1fr)", lg: "repeat(2, 1fr)" }}
                spaceY={5}
                spaceX={5}
                flex="1"
                display={{ base: "none", lg: "grid" }}
            >
                {/* Block 1 */}
                <MotionBox
                    gridColumn={{ base: "span 2", lg: "span 2" }}
                    gridRow={{ base: "span 1", lg: "span 2" }}
                    bgGradient="linear(to-br, green.200, green.400)"
                    borderRadius="md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    position="relative"
                >
                    <Image
                        src={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMHNlY3VyaXR5fGVufDB8fDB8fHwy"}
                        alt="Strong Passwords"
                        borderRadius="md"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />
                    {/* <Text
                        fontSize="sm"
                        fontWeight="bold"
                        p={4}
                        textAlign="center"
                        borderRadius="md"
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                    >
                        Generate Strong Passwords
                    </Text> */}
                </MotionBox>

                {/* Block 2 */}
                <MotionBox
                    gridColumn={{ base: "span 2", lg: "span 2" }}
                    gridRow={{ base: "span 1", lg: "span 2" }}
                    bgGradient="linear(to-br, green.300, green.500)"
                    borderRadius="md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    position="relative"
                >
                    <Image
                        src={"https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2glMjBzZWN1cml0eXxlbnwwfHwwfHx8Mg%3D%3D"}
                        alt="Store Passkeys"
                        borderRadius="md"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />
                    {/* <Text
                        fontSize="xl"
                        fontWeight="bold"
                        p={4}
                        textAlign="center"
                        borderRadius="md"
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                    >
                        Store Passkeys Securely
                    </Text> */}
                </MotionBox>

                {/* Block 3 */}
                <MotionBox
                    gridColumn={{ base: "span 2", lg: "span 1" }}
                    gridRow={{ base: "span 1", lg: "span 1" }}
                    bgGradient="linear(to-br, green.200, green.400)"
                    borderRadius="md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    position="relative"
                >
                    <Image
                        src={"https://images.unsplash.com/photo-1667372283587-e1557c08aca4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHRlY2glMjBzZWN1cml0eXxlbnwwfHwwfHx8Mg%3D%3D"}
                        alt="Accessible Anywhere"
                        borderRadius="md"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />
                    {/* <Text
                        fontSize="sm"
                        fontWeight="bold"
                        p={4}
                        textAlign="center"
                        borderRadius="md"
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                    >
                        Accessible Anywhere
                    </Text> */}
                </MotionBox>

                {/* Block 4 */}
                <MotionBox
                    gridColumn={{ base: "span 2", lg: "span 3" }}
                    gridRow={{ base: "span 1", lg: "span 1" }}
                    bgGradient="linear(to-br, green.300, green.500)"
                    borderRadius="md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    position="relative"
                >
                    <Image
                        src={"https://images.unsplash.com/photo-1690627931320-16ac56eb2588?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Your Security"
                        borderRadius="md"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />
                    {/* <Text
                        fontSize="sm"
                        fontWeight="bold"
                        p={4}
                        textAlign="center"

                        borderRadius="md"
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                    >
                        Your Security, Our Priority
                    </Text> */}
                </MotionBox>
            </Grid>
        </Flex>
    );
};

export default HeroSection;