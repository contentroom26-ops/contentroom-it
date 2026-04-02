import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";

const Index = () => (
  <main className="bg-background min-h-screen overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <div id="servizi"><ServicesSection /></div>
    <ResultsSection />
    <div id="portfolio"><PortfolioSection /></div>
    <div id="contatti"><CTASection /></div>
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-foreground tracking-tight">STUDIO</span>
        <p className="text-muted-foreground font-body text-sm">© 2026 — Tutti i diritti riservati</p>
      </div>
    </footer>
  </main>
);

export default Index;
