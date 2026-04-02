import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const CYAN = "hsl(200 80% 74%)";

const projects = [
  { img: portfolio1, name: "Luxe Fashion", result: "+200k views", desc: "Strategia social completa per brand di moda con contenuti editoriali e campagne ads." },
  { img: portfolio2, name: "Gusto Ristorante", result: "+150% engagement", desc: "Food content creation e gestione profili social con risultati record." },
  { img: portfolio3, name: "FitPro Academy", result: "+80k followers", desc: "Crescita organica e campagne di lead generation per centro fitness." },
  { img: portfolio4, name: "Glow Skincare", result: "+300% vendite", desc: "E-commerce strategy e contenuti prodotto per brand skincare." },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportH = window.innerHeight;
      const scrolled = -rect.top;
      const totalScroll = sectionHeight - viewportH;

      if (scrolled < 0 || scrolled > totalScroll) {
        setActiveIndex(-1);
        window.dispatchEvent(new CustomEvent("portfolioActiveChange", { detail: -1 }));
        return;
      }

      const progress = scrolled / totalScroll;
      const idx = Math.min(3, Math.floor(progress * 4));
      setActiveIndex(idx);
      window.dispatchEvent(new CustomEvent("portfolioActiveChange", { detail: idx }));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = activeIndex >= 0 ? projects[activeIndex] : null;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky content */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px" style={{ background: CYAN }} />
              <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CYAN }}>
                Portfolio
              </p>
            </div>
            <h2
              className="font-display font-bold tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Progetti<br />
              <span className="text-muted-foreground">selezionati.</span>
            </h2>
          </motion.div>

          {/* Active project card */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      background: "hsl(0 0% 8% / 0.6)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid hsl(200 80% 74% / 0.15)",
                      boxShadow: "0 0 40px hsl(200 80% 74% / 0.08), 0 20px 50px -15px rgba(0,0,0,0.4)",
                    }}
                    onClick={() => setSelected(activeIndex)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/7] overflow-hidden">
                      <img
                        src={active.img}
                        alt={active.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-6">
                        <span
                          className="font-display font-bold text-sm"
                          style={{ color: CYAN }}
                        >
                          {active.result}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 md:p-8">
                      <h3
                        className="font-display font-bold tracking-tight mb-3"
                        style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                      >
                        {active.name}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5 max-w-md">
                        {active.desc}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs tracking-[0.25em] uppercase" style={{ color: CYAN }}>
                          Vedi progetto
                        </span>
                        <ArrowUpRight className="w-4 h-4" style={{ color: CYAN }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!active && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-muted-foreground font-body text-sm italic"
              >
                Scorri per esplorare i progetti sulla parete →
              </motion.p>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex gap-3 mt-8">
            {projects.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: activeIndex === i ? 32 : 8,
                  background: activeIndex === i ? CYAN : "hsl(200 80% 74% / 0.2)",
                  boxShadow: activeIndex === i ? `0 0 10px hsl(200 80% 74% / 0.3)` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden max-w-2xl w-full"
              style={{
                background: "hsl(0 0% 8% / 0.9)",
                border: "1px solid hsl(200 80% 74% / 0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img src={projects[selected].img} alt={projects[selected].name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <p className="font-display font-semibold text-lg mb-2" style={{ color: CYAN }}>{projects[selected].result}</p>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">{projects[selected].name}</h3>
                <p className="text-muted-foreground font-body">{projects[selected].desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
