import { Navbar } from "../components/navbar";
import { CallToActionSection, FeaturesSection, HeroSection, TestimonialsSection } from "./sections/welcome";

const Welcome = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <CallToActionSection />
        </>
    );
};

export default Welcome;