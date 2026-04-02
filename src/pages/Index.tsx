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
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen key="splash" onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
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
    </>
  );
};

export default Index;
