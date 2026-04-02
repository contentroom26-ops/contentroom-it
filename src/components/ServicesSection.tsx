import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Aperture, Share2, Rocket, Code2, ArrowUpRight } from "lucide-react";

const CYAN = "hsl(200 80% 74%)";

const services = [
  {
    icon: Aperture,
    num: "01",
    title: "Content\nCreation",
    desc: "Produciamo video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand.",
    accent: CYAN,
  },
  {
    icon: Share2,
    num: "02",
    title: "Social Media\nManagement",
    desc: "Gestione strategica dei tuoi canali social con un piano editoriale su misura.",
    accent: "hsl(200 60% 85%)",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Growth &\nMarketing",
    desc: "Strategie data-driven e campagne ads per scalare il tuo business online.",
    accent: CYAN,
  },
  {
    icon: Code2,
    num: "04",
    title: "Siti &\nDigitalizzazione",
    desc: "Design e sviluppo di esperienze digitali che convertono e distinguono.",
    accent: "hsl(200 60% 85%)",
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

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 120, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -60 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="relative cursor-pointer group"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{
          rotateX: hovered ? (mousePos.y - 50) * -0.08 : 0,
          rotateY: hovered ? (mousePos.x - 50) * 0.08 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="relative rounded-2xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Main card body */}
        <div
          className="relative flex flex-col md:flex-row items-stretch min-h-[280px] md:min-h-[320px] border border-border/20 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(0 0% 8% / 0.8), hsl(0 0% 5% / 0.9))",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Spotlight glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, hsl(200 80% 74% / 0.06), transparent 50%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Accent color block — editorial style */}
          <motion.div
            className={`relative w-full md:w-[35%] flex items-center justify-center overflow-hidden ${
              isEven ? "order-1" : "order-1 md:order-2"
            }`}
            style={{
              background: hovered
                ? `linear-gradient(135deg, ${service.accent}, hsl(200 80% 60%))`
                : `linear-gradient(135deg, hsl(200 80% 74% / 0.08), hsl(200 80% 74% / 0.03))`,
              transition: "background 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              minHeight: "160px",
            }}
          >
            {/* Large number watermark */}
            <motion.span
              className="absolute font-display font-bold select-none"
              style={{
                fontSize: "clamp(120px, 15vw, 200px)",
                lineHeight: 1,
                color: hovered ? "hsl(0 0% 0% / 0.12)" : "hsl(200 80% 74% / 0.08)",
                transition: "color 0.6s ease",
              }}
            >
              {service.num}
            </motion.span>

            {/* Icon */}
            <motion.div
              animate={{
                scale: hovered ? 1.2 : 1,
                rotate: hovered ? 15 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: hovered ? "hsl(0 0% 0% / 0.15)" : "hsl(200 80% 74% / 0.1)",
                border: `1px solid ${hovered ? "hsl(0 0% 0% / 0.2)" : "hsl(200 80% 74% / 0.15)"}`,
                transition: "background 0.5s ease, border 0.5s ease",
              }}
            >
              <service.icon
                className="w-7 h-7 transition-colors duration-500"
                style={{ color: hovered ? "hsl(0 0% 5%)" : CYAN }}
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div
            className={`flex-1 flex flex-col justify-between p-8 md:p-10 relative z-10 ${
              isEven ? "order-2" : "order-2 md:order-1"
            }`}
          >
            <div>
              {/* Title */}
              <motion.h3
                className="font-display font-bold tracking-tight leading-[1.05] whitespace-pre-line mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                animate={{
                  x: hovered ? 8 : 0,
                  color: hovered ? CYAN : "hsl(40 20% 92%)",
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {service.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-muted-foreground font-body text-sm md:text-base leading-relaxed max-w-sm"
                animate={{ opacity: hovered ? 1 : 0.7, x: hovered ? 8 : 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                {service.desc}
              </motion.p>
            </div>

            {/* Bottom row: explore link */}
            <motion.div
              className="flex items-center gap-2 mt-6"
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="font-display text-xs tracking-[0.3em] uppercase" style={{ color: CYAN }}>
                Scopri di più
              </span>
              <motion.div
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-4 h-4" style={{ color: CYAN }} />
              </motion.div>
            </motion.div>
          </div>

          {/* Animated border line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, ${CYAN}, transparent)`,
            }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Cards — stacked editorial layout */}
        <div className="flex flex-col gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
