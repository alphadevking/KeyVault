import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "motion/react";

// Chakra + Motion Integration
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);

const CallToActionSection: React.FC = () => {
    return (
        <Flex
            as="section"
            direction="column"
            py={8}
            px={{ base: 6, lg: 12 }}
            align="center"
        >
            <MotionHeading
                fontSize={{ base: "2xl", md: "4xl" }}
                mb={4}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                textAlign="center"
            >
                Get Started Today!
            </MotionHeading>
            <MotionText
                fontSize={{ base: "lg", md: "xl" }}
                mb={6}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                textAlign="center"
                letterSpacing={"tight"}
            >
                Join thousands of users who trust KeyVault for their password management. Sign up now and secure your digital life!
            </MotionText>
            <MotionButton
                size={"lg"}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Start Free Trial
            </MotionButton>
        </Flex>
    );
};

export default CallToActionSection;