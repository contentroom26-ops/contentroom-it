import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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

/* ── Single card with scroll-driven "fly from wall" effect ── */
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

  /* Per-card scroll tracking */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const fromLeft = index % 2 === 0;
  const dir = fromLeft ? -1 : 1;

  /* Scroll-driven transforms — card flies from wall → center → opposite wall */
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.55, 0.75, 1],
    [`${dir * 120}%`, `${dir * 40}%`, "0%", "0%", `${-dir * 40}%`, `${-dir * 120}%`]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.55, 0.75, 1],
    [dir * 60, dir * 20, 0, 0, -dir * 20, -dir * 60]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.55, 0.75, 1],
    [0.4, 0.75, 1, 1, 0.75, 0.4]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.65, 0.85, 1],
    [0, 0.6, 1, 1, 0.6, 0]
  );
  const z = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [-200, -50, 0, -50, -200]
  );

  /* Glow intensity linked to scroll */
  const [glowIntensity, setGlowIntensity] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const center = Math.abs(v - 0.5);
    setGlowIntensity(Math.max(0, 1 - center * 3));
  });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div ref={cardRef} className="min-h-[70vh] flex items-center justify-center relative">
      {/* Ambient glow on the "wall" behind the card */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          left: fromLeft ? "-10%" : "auto",
          right: fromLeft ? "auto" : "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          background: `radial-gradient(ellipse, hsl(200 80% 74% / ${glowIntensity * 0.15}) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Floating particles trail */}
      {Array.from({ length: 5 }).map((_, pi) => (
        <motion.div
          key={pi}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3 + pi * 2,
            height: 3 + pi * 2,
            background: CYAN,
            opacity: glowIntensity * (0.15 + pi * 0.05),
            filter: `blur(${pi}px)`,
            left: fromLeft ? `${10 + pi * 8}%` : `${80 - pi * 8}%`,
            top: `${35 + pi * 6}%`,
          }}
          animate={{
            y: [0, -20 - pi * 5, 0],
            x: [0, (fromLeft ? 10 : -10) * pi, 0],
          }}
          transition={{
            duration: 3 + pi * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: pi * 0.3,
          }}
        />
      ))}

      <motion.div
        style={{
          x,
          rotateY,
          scale,
          opacity,
          translateZ: z,
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMove}
        className="relative w-full max-w-5xl cursor-pointer"
      >
        <motion.div
          animate={{
            rotateX: hovered ? (mousePos.y - 50) * -0.1 : 0,
            rotateY: hovered ? (mousePos.x - 50) * 0.1 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative flex flex-col md:flex-row items-stretch min-h-[280px] md:min-h-[340px] rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, hsl(0 0% 8% / 0.7), hsl(0 0% 5% / 0.85))`,
              backdropFilter: "blur(30px)",
              border: `1px solid hsl(200 80% 74% / ${0.1 + glowIntensity * 0.15})`,
              boxShadow: `
                0 0 ${30 + glowIntensity * 40}px hsl(200 80% 74% / ${glowIntensity * 0.12}),
                inset 0 1px 0 hsl(200 80% 74% / 0.08),
                0 25px 60px -15px rgba(0,0,0,0.5)
              `,
            }}
          >
            {/* Mouse spotlight */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
              style={{
                background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, hsl(200 80% 74% / 0.08), transparent 50%)`,
                opacity: hovered ? 1 : 0,
              }}
            />

            {/* Accent block — gallery frame feel */}
            <motion.div
              className={`relative w-full md:w-[38%] flex items-center justify-center overflow-hidden ${
                fromLeft ? "order-1" : "order-1 md:order-2"
              }`}
              style={{
                background: hovered
                  ? `linear-gradient(135deg, ${service.accent}, hsl(200 80% 60%))`
                  : `linear-gradient(135deg, hsl(200 80% 74% / 0.06), hsl(200 80% 74% / 0.02))`,
                transition: "background 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                minHeight: "180px",
              }}
            >
              {/* Frame border effect — mimics the wall frames */}
              <div
                className="absolute inset-2 pointer-events-none rounded-lg"
                style={{
                  border: `1px solid hsl(200 80% 74% / ${hovered ? 0.3 : 0.1})`,
                  transition: "border-color 0.6s ease",
                }}
              />

              {/* Big number */}
              <motion.span
                className="absolute font-display font-bold select-none"
                style={{
                  fontSize: "clamp(100px, 14vw, 180px)",
                  lineHeight: 1,
                  color: hovered ? "hsl(0 0% 0% / 0.12)" : "hsl(200 80% 74% / 0.06)",
                  transition: "color 0.6s ease",
                }}
                animate={{ scale: hovered ? 1.1 : 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {service.num}
              </motion.span>

              {/* Icon with glow */}
              <motion.div
                animate={{
                  scale: hovered ? 1.25 : 1,
                  rotate: hovered ? 12 : 0,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: hovered ? "hsl(0 0% 0% / 0.2)" : "hsl(200 80% 74% / 0.08)",
                  border: `1px solid ${hovered ? "hsl(0 0% 100% / 0.15)" : "hsl(200 80% 74% / 0.12)"}`,
                  boxShadow: hovered ? `0 0 30px hsl(200 80% 74% / 0.2)` : "none",
                  transition: "all 0.5s ease",
                }}
              >
                <service.icon
                  className="w-7 h-7 transition-all duration-500"
                  style={{ color: hovered ? "hsl(0 0% 95%)" : CYAN }}
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>

            {/* Text content */}
            <div
              className={`flex-1 flex flex-col justify-between p-8 md:p-10 relative z-10 ${
                fromLeft ? "order-2" : "order-2 md:order-1"
              }`}
            >
              <div>
                <motion.h3
                  className="font-display font-bold tracking-tight leading-[1.05] whitespace-pre-line mb-4"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                  animate={{
                    x: hovered ? 10 : 0,
                    color: hovered ? CYAN : "hsl(40 20% 92%)",
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  className="text-muted-foreground font-body text-sm md:text-base leading-relaxed max-w-sm"
                  animate={{ opacity: hovered ? 1 : 0.6, x: hovered ? 10 : 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  {service.desc}
                </motion.p>
              </div>

              <motion.div
                className="flex items-center gap-2 mt-6"
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span
                  className="font-display text-xs tracking-[0.3em] uppercase"
                  style={{ color: CYAN }}
                >
                  Scopri di più
                </span>
                <motion.div
                  animate={{ x: hovered ? 6 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: CYAN }} />
                </motion.div>
              </motion.div>
            </div>

            {/* Animated border sweep */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, ${CYAN}, hsl(200 60% 85%), transparent)`,
              }}
              animate={{ width: hovered ? "100%" : "0%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Top edge glow */}
            <motion.div
              className="absolute top-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(270deg, ${CYAN}, transparent)`,
              }}
              animate={{ width: hovered ? "60%" : "0%" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Section ── */
const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.15], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [0.9, 1]);

  return (
    <section ref={sectionRef} className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="h-px"
              style={{ background: CYAN }}
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <p
              className="font-body text-xs tracking-[0.4em] uppercase"
              style={{ color: CYAN }}
            >
              Servizi
            </p>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            I nostri
            <br />
            <span className="text-muted-foreground">servizi.</span>
          </h2>
        </motion.div>

        {/* Cards — each card occupies significant vertical space for scroll room */}
        <div className="flex flex-col">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
