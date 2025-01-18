import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import { Navbar } from "../components/navbar";
import {
    CallToActionSection,
    FAQ,
    // FeaturesSection,
    HeroSection,
    TestimonialsSection
} from "./sections/welcome";

const Welcome = () => {
    return (
        <>
            <Box>
                <Navbar />
                <HeroSection />
                {/* <FeaturesSection /> */}
                <TestimonialsSection />
                <CallToActionSection />
                <FAQ />
                <Footer />
            </Box>
        </>
    );
};

export default Welcome;