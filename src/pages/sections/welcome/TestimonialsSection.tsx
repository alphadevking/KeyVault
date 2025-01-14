import React from "react";
import { Box, Flex, Grid, Heading, Text, Avatar } from "@chakra-ui/react";
import { motion } from "motion/react";
import { testimonials } from "../../../utils/data";

// Chakra + Motion Integration
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);

const TestimonialsSection: React.FC = () => {
    return (
        <Flex
            as="section"
            direction="column"
            py={8}
            px={{ base: 6, lg: 12 }}
            bg={"transparent"}
            backdropFilter="blur(10px)"
            borderRadius="lg"
            boxShadow="lg"
        >
            <MotionHeading
                fontSize={{ base: "2xl", md: "4xl" }}
                mb={8}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                textAlign="center"
                fontFamily={"faustina"}
            >
                What Our Users Say
            </MotionHeading>
            <Grid
                templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                gap={6}
            >
                {testimonials.map((testimonial, index) => (
                    <MotionBox
                        key={index}
                        p={6}
                        borderRadius="md"
                        shadow="lg"
                        bg={"transparent"}
                        backdropFilter="blur(6px)"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <Flex align="center" mb={4}>
                            <Avatar.Root mr={4}>
                                <Avatar.Image src={testimonial.avatar} />
                            </Avatar.Root>
                            <Heading fontSize="lg" color="green.500">
                                {testimonial.name}
                            </Heading>
                        </Flex>
                        <Text opacity={0.8}>{testimonial.feedback}</Text>
                    </MotionBox>
                ))}
            </Grid>
        </Flex>
    );
};

export default TestimonialsSection;
