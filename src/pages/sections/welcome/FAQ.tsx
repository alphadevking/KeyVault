import { Box, Container, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../../../components/ui/accordion";
import { faqs } from "../../../utils/data";
import { useState } from "react";
import { motion } from "motion/react";

const MotionBox = motion.create(Box);

const FAQ = () => {

    const [index, setIndex] = useState(0);

    return (
        <>
            <Box as={Container} maxW={"6xl"} px={{ base: 6, lg: 12 }}>
                <Flex direction={{ base: "column", md: "row" }} gap={5} justifyContent={"center"} alignItems={"center"}>
                    <AccordionRoot collapsible size={"lg"}>
                        {faqs.map((item, index) => (
                            <AccordionItem key={index} value={item.title}>
                                <AccordionItemTrigger onClick={() => setIndex(index)}>
                                    <Stack gap="1" fontSize={"sm"}>
                                        <Text>{item.title}</Text>
                                    </Stack>
                                </AccordionItemTrigger>
                                <AccordionItemContent py={5}>{item.text}</AccordionItemContent>
                            </AccordionItem>
                        ))}
                    </AccordionRoot>
                    <MotionBox w={{ base: "100%", md: "50%" }} h={{ base: "auto", md: "auto" }} transition={{ duration: 0.5, damping: 10, stiffness: 100, type: "spring" }} m={"auto"} right={0}>
                        <Image src={faqs[index].image} alt={faqs[index].title} rounded={"md"} />
                    </MotionBox>
                </Flex>
            </Box>
        </>
    );
};

export default FAQ;