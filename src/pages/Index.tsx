import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!splashDone && (
          <motion.div
            key="splash"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SplashScreen onComplete={() => setSplashDone(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {splashDone && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-background min-h-screen overflow-x-hidden"
        >
          <Navbar />
          <HeroSection />
          <div id="servizi"><ServicesSection /></div>
          <ResultsSection />
          <div id="portfolio"><PortfolioSection /></div>
          <div id="contatti"><CTASection /></div>
          <footer className="py-10 px-6 border-t border-border">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-display font-bold text-foreground tracking-tight">Content Room</span>
              <p className="text-muted-foreground font-body text-sm">© 2026 — Tutti i diritti riservati</p>
            </div>
          </footer>
        </motion.main>
      )}
    </>
  );
};

export default Index;
