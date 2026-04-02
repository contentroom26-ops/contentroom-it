import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Eye, TrendingUp, Users } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const projects = [
  {
    img: portfolio1,
    name: "Luxe Fashion",
    category: "Social Strategy",
    result: "+200k views",
    icon: Eye,
    desc: "Strategia social completa per brand di moda con contenuti editoriali.",
  },
  {
    img: portfolio2,
    name: "Gusto Ristorante",
    category: "Content Creation",
    result: "+150% engagement",
    icon: TrendingUp,
    desc: "Food content creation e gestione profili social con risultati record.",
  },
  {
    img: portfolio3,
    name: "FitPro Academy",
    category: "Growth",
    result: "+80k followers",
    icon: Users,
    desc: "Crescita organica e campagne di lead generation per centro fitness.",
  },
  {
    img: portfolio4,
    name: "Glow Skincare",
    category: "E-commerce",
    result: "+300% vendite",
    icon: TrendingUp,
    desc: "E-commerce strategy e contenuti prodotto per brand skincare.",
  },
];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="portfolio" ref={ref} className="relative py-32 md:py-40">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 3%) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              (4) Portfolio
            </p>
            <h2
              className="font-display font-bold text-foreground tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              I nostri lavori<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="font-body text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
            Brand che hanno scelto Content Room per la loro presenza digitale. Risultati verificati.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((proj, i) => {
            const Icon = proj.icon;
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${isLarge ? "md:row-span-2" : ""}`}
                style={{
                  aspectRatio: isLarge ? "3/4" : "16/10",
                }}
              >
                {/* Image */}
                <img
                  src={proj.img}
                  alt={proj.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.5) saturate(0.85)" }}
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:opacity-80"
                  style={{
                    background: "linear-gradient(180deg, transparent 30%, hsl(0 0% 3% / 0.9) 100%)",
                    opacity: 0.7,
                  }}
                />

                {/* Top left: category */}
                <div className="absolute top-5 left-5 z-10">
                  <span
                    className="font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "hsl(0 0% 100% / 0.08)",
                      backdropFilter: "blur(10px)",
                      color: "hsl(0 0% 80%)",
                      border: "1px solid hsl(0 0% 100% / 0.1)",
                    }}
                  >
                    {proj.category}
                  </span>
                </div>

                {/* Top right: arrow */}
                <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 -translate-x-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "hsl(38 90% 55%)",
                    }}
                  >
                    <ArrowUpRight size={18} className="text-background" />
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  {/* Result badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={14} className="text-primary" />
                    <span className="font-display font-bold text-sm text-primary">
                      {proj.result}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                    {proj.name}
                  </h3>

                  <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {proj.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="tracking-[0.15em] uppercase">Tutti i progetti</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
