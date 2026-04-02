import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Aperture, Share2, Rocket, Code2, ArrowUpRight } from "lucide-react";

const CYAN = "hsl(200 80% 74%)";

const services = [
  {
    icon: Aperture,
    num: "01",
    title: "Content Creation",
    desc: "Produciamo video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand con uno stile unico e riconoscibile.",
  },
  {
    icon: Share2,
    num: "02",
    title: "Social Media Management",
    desc: "Gestione strategica dei tuoi canali social con un piano editoriale su misura per massimizzare reach e engagement.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Growth & Marketing",
    desc: "Strategie data-driven e campagne ads per scalare il tuo business online con risultati misurabili.",
  },
  {
    icon: Code2,
    num: "04",
    title: "Siti & Digitalizzazione",
    desc: "Design e sviluppo di esperienze digitali che convertono visitatori in clienti.",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportH = window.innerHeight;

      // How far we've scrolled into the section
      const scrolled = -rect.top;
      const totalScroll = sectionHeight - viewportH;

      if (scrolled < 0 || scrolled > totalScroll) {
        setActiveIndex(-1);
        window.dispatchEvent(new CustomEvent("serviceActiveChange", { detail: -1 }));
        return;
      }

      const progress = scrolled / totalScroll;
      const idx = Math.min(3, Math.floor(progress * 4));
      setActiveIndex(idx);
      window.dispatchEvent(new CustomEvent("serviceActiveChange", { detail: idx }));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = activeIndex >= 0 ? services[activeIndex] : null;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky content panel */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px" style={{ background: CYAN }} />
              <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CYAN }}>
                Servizi
              </p>
            </div>
            <h2
              className="font-display font-bold tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              I nostri<br />
              <span className="text-muted-foreground">servizi.</span>
            </h2>
          </motion.div>

          {/* Active service detail */}
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div
                    className="rounded-2xl p-8 md:p-10"
                    style={{
                      background: "hsl(0 0% 8% / 0.6)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid hsl(200 80% 74% / 0.15)",
                      boxShadow: "0 0 40px hsl(200 80% 74% / 0.08), 0 20px 50px -15px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Number + Icon row */}
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="font-display font-bold text-5xl md:text-6xl"
                        style={{ color: "hsl(200 80% 74% / 0.15)" }}
                      >
                        {active.num}
                      </span>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: "hsl(200 80% 74% / 0.1)",
                          border: "1px solid hsl(200 80% 74% / 0.2)",
                        }}
                      >
                        <active.icon size={22} strokeWidth={1.5} style={{ color: CYAN }} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display font-bold tracking-tight mb-4"
                      style={{
                        fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                        color: CYAN,
                      }}
                    >
                      {active.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-6 max-w-md">
                      {active.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2">
                      <span
                        className="font-display text-xs tracking-[0.25em] uppercase"
                        style={{ color: CYAN }}
                      >
                        Scopri di più
                      </span>
                      <ArrowUpRight className="w-4 h-4" style={{ color: CYAN }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Placeholder when no service active */}
            {!active && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-muted-foreground font-body text-sm italic"
              >
                Scorri per esplorare i servizi sulla parete ←
              </motion.p>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex gap-3 mt-8">
            {services.map((_, i) => (
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
    </section>
  );
};

export default ServicesSection;
