import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import TunnelBackground from "@/components/TunnelBackground";
import SplashScreen from "@/components/SplashScreen";

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
        {/* Fixed 3D tunnel background */}
        <TunnelBackground />

        {/* All content floats above the tunnel */}
        <main className="relative z-10 min-h-screen overflow-x-hidden">
          <Navbar />
          <HeroSection />
          {/* Spacers to give scroll distance for the 3D corridor */}
          <div className="h-[50vh]" />
          <div id="servizi"><ServicesSection /></div>
          <div className="h-[30vh]" />
          <ResultsSection />
          <div className="h-[30vh]" />
          <div id="portfolio"><PortfolioSection /></div>
          <div className="h-[30vh]" />
          <div id="contatti"><CTASection /></div>
          <footer className="py-10 px-6 border-t border-border/30">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-display font-bold text-foreground tracking-tight">Content Room</span>
              <p className="text-muted-foreground font-body text-sm">© 2026 — Tutti i diritti riservati</p>
            </div>
          </footer>
        </main>
      </motion.div>
    </>
  );
};

export default Index;
