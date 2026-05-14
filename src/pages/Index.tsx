import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChiSiamoSection from "@/components/ChiSiamoSection";
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
      <Helmet>
        <title>Content Room — Agenzia di comunicazione e marketing a Firenze</title>
        <meta
          name="description"
          content="Content Room è l'agenzia di comunicazione e marketing di Firenze: strategia, contenuti, social media, growth e digitalizzazione per brand che vogliono crescere."
        />
        <link rel="canonical" href="https://contentroom-it.lovable.app/" />
        <meta property="og:title" content="Content Room — Agenzia di comunicazione e marketing a Firenze" />
        <meta property="og:description" content="Strategia, contenuti, social media, growth e digitalizzazione. La stanza dove nascono le idee dei brand che crescono." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://contentroom-it.lovable.app/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Content Room",
          url: "https://contentroom-it.lovable.app",
          email: "info@contentroom.it",
          description: "Agenzia di comunicazione e marketing a Firenze.",
          areaServed: "IT",
        })}</script>
      </Helmet>
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
            <ChiSiamoSection />
            <div id="servizi"><ServicesSection /></div>
            
            <div id="portfolio"><PortfolioSection /></div>
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
