import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const CTASection = () => (
  <section className="py-32 px-6 relative overflow-hidden">
    
    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <ScrollReveal>
        <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
          Vuoi crescere davvero<br />
          <span className="text-gradient">sui social?</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground font-body text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Prenota una call e analizziamo il tuo brand
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <Button variant="cta" size="lg" className="h-16 px-12 rounded-full text-lg">
          Prenota ora
        </Button>
      </ScrollReveal>
    </div>
  </section>
);

export default CTASection;
