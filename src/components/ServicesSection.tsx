import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Aperture, Share2, Rocket, Code2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Aperture,
    num: "01",
    title: "Content\nCreation",
    desc: "Produciamo video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand.",
  },
  {
    icon: Share2,
    num: "02",
    title: "Social Media\nManagement",
    desc: "Gestione strategica dei tuoi canali social con un piano editoriale su misura.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Growth &\nMarketing",
    desc: "Strategie data-driven e campagne ads per scalare il tuo business online.",
  },
  {
    icon: Code2,
    num: "04",
    title: "Siti &\nDigitalizzazione",
    desc: "Design e sviluppo di esperienze digitali che convertono e distinguono.",
  },
];

const CYAN = "hsl(200 80% 74%)";

/** 3D tilt card with glow border */
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
    glowX: "50%",
    glowY: "50%",
    glowOpacity: 0,
  });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      glowX: `${(x / rect.width) * 100}%`,
      glowY: `${(y / rect.height) * 100}%`,
      glowOpacity: 1,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
      glowX: "50%",
      glowY: "50%",
      glowOpacity: 0,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative rounded-3xl cursor-pointer group"
      style={{
        transform: style.transform,
        transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow border */}
      <div
        className="absolute -inset-px rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${style.glowX} ${style.glowY}, hsl(200 80% 74% / 0.3), transparent 50%)`,
          opacity: style.glowOpacity,
          transition: "opacity 0.4s ease-out",
        }}
      />
      <div
        className="absolute -inset-px rounded-3xl pointer-events-none"
        style={{
          boxShadow: style.glowOpacity > 0
            ? "0 0 40px 4px hsl(200 80% 74% / 0.08), 0 20px 60px -10px hsl(200 80% 74% / 0.06)"
            : "none",
          transition: "box-shadow 0.4s ease-out",
        }}
      />
      {/* Card body */}
      <div
        className="relative rounded-3xl border border-border/20 p-10 md:p-12 h-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 10% / 0.6), hsl(0 0% 7% / 0.6))",
          backdropFilter: "blur(12px)",
          transform: "translateZ(0)",
        }}
      >
        {/* Spotlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${style.glowX} ${style.glowY}, hsl(200 80% 74% / 0.05), transparent 60%)`,
            opacity: style.glowOpacity,
            transition: "opacity 0.4s ease-out",
          }}
        />
        {children}
      </div>
    </div>
  );
}

const ServicesSection = () => (
  <section className="py-32 px-6 relative">
    <div className="max-w-6xl mx-auto relative z-10">
      <ScrollReveal>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: CYAN }} />
          <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CYAN }}>
            Servizi
          </p>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-20 leading-[1.1]">
          Tutto ciò che serve<br />
          <span className="text-muted-foreground">per dominare i social.</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-5">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.1}>
            <TiltCard>
              <div className="relative z-10 flex flex-col h-full min-h-[220px]">
                {/* Top row: number + icon */}
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="font-display text-5xl md:text-6xl font-extralight tracking-tighter opacity-20 leading-none"
                    style={{ color: CYAN }}
                  >
                    {s.num}
                  </span>
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      border: `1px solid hsl(200 80% 74% / 0.2)`,
                      background: "hsl(200 80% 74% / 0.05)",
                    }}
                    whileHover={{ rotate: 90, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: CYAN }} strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Title — multi-line */}
                <h3
                  className="font-display font-semibold text-2xl md:text-3xl tracking-tight leading-[1.15] mb-4 whitespace-pre-line group-hover:text-[hsl(200,80%,74%)] transition-colors duration-500"
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-body text-sm leading-relaxed mt-auto">
                  {s.desc}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="mt-8 h-px w-0 group-hover:w-full"
                  style={{
                    background: `linear-gradient(90deg, ${CYAN}, transparent)`,
                    transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
