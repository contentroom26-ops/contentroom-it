import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, BarChart3, TrendingUp, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  { icon: Camera, title: "Content Creation", desc: "Video, foto e grafiche per i tuoi social" },
  { icon: BarChart3, title: "Social Media Management", desc: "Gestione completa dei tuoi canali" },
  { icon: TrendingUp, title: "Growth & Marketing", desc: "Strategie data-driven per scalare" },
  { icon: Globe, title: "Siti & Digitalizzazione", desc: "Presenza online professionale" },
];

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
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
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
      className="relative rounded-2xl cursor-pointer group"
      style={{
        transform: style.transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow border that follows the mouse */}
      <div
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${style.glowX} ${style.glowY}, hsl(200 80% 74% / 0.35), transparent 60%)`,
          opacity: style.glowOpacity,
          transition: "opacity 0.3s ease-out",
        }}
      />
      {/* Ambient glow on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        style={{
          boxShadow: style.glowOpacity > 0
            ? "0 0 30px 2px hsl(200 80% 74% / 0.12), inset 0 0 30px 2px hsl(200 80% 74% / 0.03)"
            : "none",
          transition: "box-shadow 0.3s ease-out",
        }}
      />
      {/* Card content */}
      <div className="relative rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30 p-8 md:p-10 h-full"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Inner spotlight */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(300px circle at ${style.glowX} ${style.glowY}, hsl(200 80% 74% / 0.06), transparent 60%)`,
            opacity: style.glowOpacity,
            transition: "opacity 0.3s ease-out",
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
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">Servizi</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-20">
          Tutto ciò che serve<br />
          <span className="text-muted-foreground">per dominare i social.</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.12}>
            <TiltCard>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-[hsl(200_80%_74%_/_0.1)] flex items-center justify-center mb-6 group-hover:bg-[hsl(200_80%_74%_/_0.2)] transition-colors duration-500">
                  <s.icon className="w-6 h-6" style={{ color: "hsl(200 80% 74%)" }} />
                </div>
                <h3 className="font-display font-semibold text-xl md:text-2xl mb-3 group-hover:text-[hsl(200,80%,74%)] transition-colors duration-500">
                  {s.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm">{s.desc}</p>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
