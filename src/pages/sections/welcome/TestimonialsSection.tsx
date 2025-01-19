import React, { useState } from "react";
import { Box, Flex, Heading, Text, Image, Span, Blockquote, Float, BlockquoteIcon, HStack, Avatar, Spacer } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonials } from "../../../utils/data";
import { useColorModeValue } from "../../../components/ui/color-mode";

import { Navigation } from "swiper/modules";
import { motion } from "motion/react";
import { capitalize, toUpperCase } from "../../../utils/changeCase";

// Chakra + Motion Integration
const MotionHeading = motion.create(Heading);

const TestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.realIndex); // Track the active slide index
    };

    return (
        <Flex
            as="section"
            direction={{ base: "column", lg: "row" }}
            py={8}
            px={{ base: 6, lg: 12 }}
            gap={10}
            justifyContent="center"
            alignItems="center"
        >
            {/* Section Heading */}
            <Box w={{ base: "100%", lg: "50%" }} textAlign={"left"}>
                <MotionHeading
                    fontSize={{ base: "3xl", md: "5xl" }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    lineHeight={0.8}
                >
                    What our
                </MotionHeading>
                <MotionHeading
                    fontSize={{ base: "4xl", md: "6xl" }}
                    mb={4}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    lineHeight={0.8}
                >
                    users think of us
                </MotionHeading>
                <Text fontSize={{ base: "sm", md: "md" }} mb={8}>
                    We value your satisfaction above all else. We take
                    pride in providing a service that is both easy to use and secure,
                    giving our customers peace of mind when it comes to their passwords
                    and passkeys.
                </Text>

                {/* Progress Indicator (styled like the uploaded image) */}
                <Flex mt={4} justify="start" gap={2}>
                    {testimonials.map((_, index) => (
                        <Box
                            key={index}
                            w={50}
                            h={2}
                            bg={activeIndex === index ? "green.500" : useColorModeValue("gray.300", "gray.600")}
                            transition="background-color 0.3s"
                            _hover={{ bg: useColorModeValue("gray.400", "gray.500") }}
                            onClick={() => { }}
                        />
                    ))}
                </Flex>
            </Box>

            {/* Testimonial Cards with Swiper */}
            <Box w={{ base: "100%", lg: "50%" }}>
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                    spaceBetween={20}
                    loop={true}
                    autoplay
                    speed={500}
                    modules={[Navigation]}
                    onSlideChange={handleSlideChange} // Track active slide
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                border="1px solid #f3f3f315"
                                shadow="sm"
                                p={6}
                                h={{ base: "100%", md: 400 }}
                                w={"100%"}
                                bg={useColorModeValue("black", "white")}
                                color={useColorModeValue("white", "black")}
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                alignContent={"space-between"}
                                gap={5}
                            >
                                <Image w={12} src={testimonial.office.icon} alt={testimonial.office.name} mx={"auto"} />
                                <Spacer display={{ base: "none", md: "block" }} />
                                <Blockquote.Root
                                    px={2}
                                    borderLeftColor={useColorModeValue("whiteAlpha.400", "blackAlpha.400")}
                                    alignSelf={"bottom"}
                                >
                                    <Blockquote.Content fontStyle={"italic"} p={4} fontSize={{ base: "sm", md: "md" }} fontSmooth={"always"} h={150}>
                                        <Text>
                                            {testimonial.feedback}
                                        </Text>
                                    </Blockquote.Content>
                                    <Float placement="bottom-end" offsetX={4} offsetY={-4}>
                                        <BlockquoteIcon color={"green.400"} opacity={0.5} boxSize={5} rotate="180deg" />
                                    </Float>
                                </Blockquote.Root>
                                <HStack py={6} px={4}>
                                    <Avatar.Root
                                        as={
                                            () => <Avatar.Image src={testimonial.avatar} alt={testimonial.name} w={10} h={10} rounded={"full"} />
                                        }
                                    />
                                    <Box>
                                        <Span fontWeight="medium" fontSize={"sm"}>{capitalize(testimonial.name)}</Span>
                                        <Text fontSize={"xs"}>{toUpperCase(testimonial.office.position)}, {capitalize(testimonial.office.name)}</Text>
                                    </Box>
                                </HStack>
                                <Spacer />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Flex>
    );
};

export default TestimonialsSection;
