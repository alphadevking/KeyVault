import React from "react";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
import { features } from "../../../utils/data";

// Chakra + Motion Integration
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

const FeaturesSection: React.FC = () => {
    return (
        <Flex as="section" direction="column" py={8} px={{ base: 6, lg: 12 }}>
            <MotionHeading
                fontSize={{ base: "2xl", md: "4xl" }}
                mb={8}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                textAlign="center"
                fontFamily={"faustina"}
            >
                Key Features
            </MotionHeading>
            <Grid
                templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                gap={6}
            >
                {features.map((feature, index) => (
                    <MotionBox
                        key={index}
                        p={6}
                        borderRadius="md"
                        shadow="md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <Heading fontSize="xl" mb={4}>
                            {feature.title}
                        </Heading>
                        <Text>{feature.description}</Text>
                    </MotionBox>
                ))}
            </Grid>
        </Flex>
    );
};

export default FeaturesSection;