import React from "react";
import { Box, Button, Grid, Heading, Text, Flex } from "@chakra-ui/react";
import { motion } from "motion/react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { Link } from "react-router";
import TiltedScroll from "../../../components/TiltedScroll/TiltedScroll";
import ShinyText from "../../../components/ShinyText/ShinyText";
import { heroTilted } from "../../../utils/data";

// Chakra + Motion Integration
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);

const HeroSection: React.FC = () => {
    return (
        <Flex
            as="section"
            direction={{ base: "column", lg: "row" }}
            minH={"100vh"}
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
                    <Box as="span" fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }} color="green.400">
                        <ShinyText text="KeyVault" disabled={false} speed={3} />
                    </Box>.
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

                <Link
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
                        Start Now <LuArrowRightFromLine className="group-hover:ml-2 transition-all" />
                    </MotionButton>
                </Link>
            </Flex>

            {/* Right Section - Grid of Animated Blocks */}
            <Grid
                w={{ base: "100%", lg: "40%" }}
            >
                <TiltedScroll items={heroTilted} />
            </Grid>
        </Flex>
    );
};

export default HeroSection;