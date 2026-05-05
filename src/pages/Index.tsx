import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen key="splash" onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Global fixed video background */}
        <GlobalVideoBackground />

        {/* All content floats above the room */}
        <main className="relative z-10 min-h-screen overflow-x-hidden">
          <Navbar />
          <PageTransition>
            <HeroSection />
            <div className="h-[30vh]" />
            <div id="servizi"><ServicesSection /></div>
            <div className="h-[20vh]" />
            <div id="portfolio"><PortfolioSection /></div>
            <div className="h-[20vh]" />
            <ResultsSection />
            <div id="contatti"><CTASection /></div>
            <FAQSection />
            <Footer />
          </PageTransition>
        </main>
      </motion.div>
    </>
  );
};

export default Index;
