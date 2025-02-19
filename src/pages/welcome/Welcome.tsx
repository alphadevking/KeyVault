import { Box } from "@chakra-ui/react";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";
import TestimonialsSection from "./TestimonialsSection";
import CallToActionSection from "./CallToActionSection";
import FAQ from "./FAQ";
import HeroSection from "./HeroSection";
// import { FeaturesSection } from "./FeaturesSection";

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