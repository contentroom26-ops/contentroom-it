import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Aperture, Share2, Rocket, Code2 } from "lucide-react";

const CELESTE = "hsl(192 49% 76%)";

const services = [
  {
    icon: Aperture,
    num: "01",
    title: "Content Creation",
    desc: "Produciamo video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand.",
  },
  {
    icon: Share2,
    num: "02",
    title: "Social Media Management",
    desc: "Gestione strategica dei tuoi canali social con un piano editoriale su misura.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Growth & Marketing",
    desc: "Strategie data-driven e campagne ads per scalare il tuo business online.",
  },
  {
    icon: Code2,
    num: "04",
    title: "Siti & Digitalizzazione",
    desc: "Design e sviluppo di esperienze digitali che convertono e distinguono.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -60 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="relative cursor-pointer group"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        animate={{
          rotateX: hovered ? (mousePos.y - 50) * -0.06 : 0,
          rotateY: hovered ? (mousePos.x - 50) * 0.06 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 25 }}
        className="relative rounded-3xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative p-8 md:p-10 rounded-3xl overflow-hidden border border-border/10"
          style={{
            background: "linear-gradient(160deg, hsl(0 0% 7% / 0.85), hsl(0 0% 4% / 0.95))",
            backdropFilter: "blur(30px)",
          }}
        >
          {/* Cursor spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, hsl(200 80% 74% / 0.07), transparent 50%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Top row: number + icon */}
          <div className="flex items-start justify-between mb-12 relative z-10">
            <motion.span
              className="font-display font-light tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                lineHeight: 0.85,
                WebkitTextStroke: hovered ? `1px ${CYAN}` : "1px hsl(0 0% 25%)",
                color: "transparent",
                transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {service.num}
            </motion.span>

            <motion.div
              animate={{
                scale: hovered ? 1.15 : 1,
                rotate: hovered ? -10 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: hovered
                  ? "linear-gradient(135deg, hsl(200 80% 74% / 0.2), hsl(200 80% 74% / 0.05))"
                  : "hsl(0 0% 100% / 0.03)",
                border: `1px solid ${hovered ? "hsl(200 80% 74% / 0.3)" : "hsl(0 0% 100% / 0.06)"}`,
                transition: "all 0.5s ease",
              }}
            >
              <service.icon
                className="w-6 h-6 transition-colors duration-500"
                style={{ color: hovered ? CYAN : "hsl(0 0% 45%)" }}
                strokeWidth={1.2}
              />
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            className="font-display font-semibold tracking-tight leading-[1.1] mb-4 relative z-10"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            animate={{
              color: hovered ? CYAN : "hsl(40 20% 92%)",
              x: hovered ? 4 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs relative z-10"
            animate={{ opacity: hovered ? 0.9 : 0.5, x: hovered ? 4 : 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {service.desc}
          </motion.p>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px]"
            style={{
              background: `linear-gradient(90deg, ${CYAN}, transparent)`,
            }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Corner glow */}
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, hsl(200 80% 74% / 0.1), transparent 70%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.5 : 0.8 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ background: CYAN }} />
            <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CYAN }}>
              Servizi
            </p>
          </div>
          <h2
            className="font-display font-bold tracking-tight mb-20 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            I nostri<br />
            <span className="text-muted-foreground">servizi.</span>
          </h2>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
