import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { Link } from "react-router";

// Chakra + Motion Integration
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);

const CallToActionSection: React.FC = () => {
    return (
        <Flex
            as="section"
            direction="column"
            py={12}
            px={{ base: 6, md: 12, lg: 16 }}
            align="center"
            overflow="hidden"
            position="relative"
        >
            <MotionHeading
                fontSize={{ base: "3xl", md: "5xl" }}
                mb={4}
                textAlign="center"
                letterSpacing="tight"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
            >
                Passwords Made Simple
            </MotionHeading>

            <MotionText
                fontSize={{ base: "sm", md: "md" }}
                mb={6}
                textAlign="center"
                letterSpacing="wide"
            >
                Generate strong, unique passwords instantly with KeyVault. Your digital safety is our priority. Join a community of security-conscious users.
            </MotionText>

            <Link to={"/gen"}>
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
    );
};

export default CallToActionSection;
