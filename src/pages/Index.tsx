import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import ImmersiveRoom from "@/components/ImmersiveRoom";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";

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
        {/* Fixed CSS 3D immersive room */}
        <ImmersiveRoom />

        {/* All content floats above the room */}
        <main className="relative z-10 min-h-screen overflow-x-hidden pb-24">
          <Navbar />
          <HeroSection />
          <div className="h-[30vh]" />
          <div id="servizi"><ServicesSection /></div>
          <div className="h-[20vh]" />
          <div id="portfolio"><PortfolioSection /></div>
          <div className="h-[20vh]" />
          <ResultsSection />
          <div id="contatti"><CTASection /></div>
          <Footer />
        </main>
      </motion.div>
    </>
  );
};

export default Index;
