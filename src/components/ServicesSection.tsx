import { motion } from "framer-motion";
import { Camera, BarChart3, TrendingUp, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  { icon: Camera, title: "Content Creation", desc: "Video, foto e grafiche per i tuoi social" },
  { icon: BarChart3, title: "Social Media Management", desc: "Gestione completa dei tuoi canali" },
  { icon: TrendingUp, title: "Growth & Marketing", desc: "Strategie data-driven per scalare" },
  { icon: Globe, title: "Siti & Digitalizzazione", desc: "Presenza online professionale" },
];

const ServicesSection = () => (
  <section className="py-32 px-6 relative">
    <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">Servizi</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-20">
          Tutto ciò che serve<br />
          <span className="text-muted-foreground">per dominare i social.</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="glass-card rounded-2xl p-8 md:p-10 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors duration-500">
                {s.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm">{s.desc}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
