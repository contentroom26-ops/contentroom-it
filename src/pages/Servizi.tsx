import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Aperture, Share2, Rocket, Code2, Check, ArrowUpRight, Search, Compass, Hammer, LineChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import InlineCTA from "@/components/InlineCTA";

const HERO_TEXT_SHADOW =
  "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)";

const CELESTE = "hsl(192 49% 76%)";

type Service = {
  icon: typeof Aperture;
  num: string;
  title: string;
  desc: string;
  includes: string[];
};

function ServiceCard({
  service,
  index,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
}: {
  service: Service;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const Icon = service.icon;
  const hovered = isHovered;
  const dimmed = isAnyHovered && !isHovered;
  const tiltX = (pos.y - 50) * -0.05;
  const tiltY = (pos.x - 50) * 0.05;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        scale: hovered ? 1.08 : dimmed ? 0.94 : 1,
        opacity: dimmed ? 0.35 : 1,
        filter: dimmed ? "blur(2px)" : "blur(0px)",
        zIndex: hovered ? 50 : 1,
      }}
      style={{ perspective: "1600px", position: "relative" }}
    >
      <motion.div
        ref={ref}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onMouseMove={handleMove}
        animate={{
          rotateX: hovered ? tiltX : 0,
          rotateY: hovered ? tiltY : 0,
          y: hovered ? -10 : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="relative flex flex-col rounded-3xl p-7 md:p-9 border overflow-hidden cursor-default h-full"
        style={{
          background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
          borderColor: hovered ? "hsl(192 49% 76% / 0.35)" : "hsl(0 0% 100% / 0.08)",
          backdropFilter: "blur(18px)",
          boxShadow: hovered
            ? "0 30px 80px hsl(0 0% 0% / 0.6), 0 0 60px hsl(192 49% 76% / 0.18)"
            : "0 20px 60px hsl(0 0% 0% / 0.5)",
          transformStyle: "preserve-3d",
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        }}
      >
        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, hsl(192 49% 76% / 0.1), transparent 50%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Animated accent line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${CELESTE}, transparent)` }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Top row: icon + number */}
        <div
          className="relative z-10 flex items-start justify-between mb-6"
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.div
            animate={{
              scale: hovered ? 1.1 : 1,
              rotate: hovered ? -8 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: hovered
                ? "linear-gradient(135deg, hsl(192 49% 76% / 0.35), hsl(192 49% 76% / 0.1))"
                : "linear-gradient(135deg, hsl(192 49% 76% / 0.22), hsl(192 49% 76% / 0.06))",
              border: `1px solid ${hovered ? "hsl(192 49% 76% / 0.7)" : "hsl(192 49% 76% / 0.4)"}`,
              boxShadow: hovered
                ? "0 0 40px hsl(192 49% 76% / 0.5)"
                : "0 0 24px hsl(192 49% 76% / 0.25)",
              transition: "all 0.5s ease",
            }}
          >
            <Icon className="w-6 h-6" style={{ color: CELESTE }} strokeWidth={1.5} />
          </motion.div>
          <motion.span
            className="font-display font-light block leading-none"
            animate={{
              scale: hovered ? 1.08 : 1,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            style={{
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              WebkitTextStroke: `1.5px ${CELESTE}`,
              color: "transparent",
              textShadow: hovered
                ? "0 0 50px hsl(192 49% 76% / 0.7)"
                : "0 0 30px hsl(192 49% 76% / 0.4)",
            }}
          >
            {service.num}
          </motion.span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col" style={{ transform: "translateZ(30px)" }}>
          <motion.h2
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold tracking-tight mb-4 leading-[1.05] text-foreground flex items-center gap-2 flex-wrap"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", textShadow: HERO_TEXT_SHADOW }}
          >
            {service.title}
            <motion.span
              animate={{
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : -10,
                rotate: hovered ? 0 : -45,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <ArrowUpRight className="w-7 h-7" style={{ color: CELESTE }} strokeWidth={1.8} />
            </motion.span>
          </motion.h2>
          <p
            className="font-body text-base md:text-lg leading-relaxed mb-6"
            style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
          >
            {service.desc}
          </p>

          {/* Hint */}
          <motion.p
            animate={{ opacity: hovered ? 0 : 0.7, y: hovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
            style={{ color: CELESTE }}
          >
            Hover per scoprire di più →
          </motion.p>

          {/* Expandable "Cosa include" panel */}
          <motion.div
            initial={false}
            animate={{
              height: hovered ? "auto" : 0,
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              height: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.4, delay: hovered ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <div
              className="rounded-2xl p-6 md:p-8 border mt-2"
              style={{
                background: "hsl(0 0% 7% / 0.7)",
                borderColor: "hsl(192 49% 76% / 0.2)",
                backdropFilter: "blur(20px)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.05)",
              }}
            >
              <p
                className="font-body text-[10px] tracking-[0.4em] uppercase mb-5"
                style={{ color: CELESTE }}
              >
                Cosa include
              </p>
              <ul className="space-y-3">
                <AnimatePresence>
                  {hovered &&
                    service.includes.map((item, idx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + idx * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start gap-3"
                      >
                        <Check
                          className="w-4 h-4 mt-1 shrink-0"
                          style={{ color: CELESTE }}
                          strokeWidth={2}
                        />
                        <span className="font-body text-sm md:text-base text-foreground/90">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Corner glow */}
        <motion.div
          className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, hsl(192 49% 76% / 0.15), transparent 70%)`,
          }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.4 : 0.8 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}

const services = [
  {
    icon: Aperture,
    num: "01",
    title: "Content Creation",
    desc: "Trasformiamo idee in contenuti visivi ad alto impatto. Video, foto e grafiche pensate per emozionare, convertire e raccontare il tuo brand con un linguaggio coerente e riconoscibile su ogni piattaforma.",
    includes: [
      "Video editoriali e brand video",
      "Shooting fotografici professionali",
      "Reels e contenuti short-form",
      "Motion graphics e animazioni",
      "Copywriting e storytelling",
    ],
  },
  {
    icon: Share2,
    num: "02",
    title: "Social Media Management",
    desc: "Gestiamo i tuoi canali social con un approccio strategico ed editoriale. Creiamo piani su misura, presidiamo la community e analizziamo i dati per far crescere la tua presenza online in modo sostenibile.",
    includes: [
      "Piano editoriale mensile",
      "Pubblicazione e scheduling",
      "Community management",
      "Reportistica mensile dettagliata",
      "Brand identity sui social",
    ],
  },
  {
    icon: Rocket,
    num: "03",
    title: "Growth & Marketing",
    desc: "Strategie data-driven per scalare il tuo business. Costruiamo funnel di acquisizione, gestiamo campagne ads multi-piattaforma e ottimizziamo ogni euro investito per generare risultati concreti e misurabili.",
    includes: [
      "Meta Ads, TikTok Ads, Google Ads",
      "Funnel di acquisizione e lead gen",
      "Email marketing e automation",
      "A/B testing e ottimizzazione CRO",
      "Analytics e dashboard custom",
    ],
  },
  {
    icon: Code2,
    num: "04",
    title: "Siti & Digitalizzazione",
    desc: "Progettiamo e sviluppiamo siti web ed esperienze digitali che convertono. Dal design alla performance, ogni dettaglio è curato per offrire un'esperienza fluida, veloce e perfettamente in linea con il tuo brand.",
    includes: [
      "Siti vetrina e landing page",
      "E-commerce e Shopify custom",
      "UX/UI design e prototipazione",
      "SEO tecnica e on-page",
      "Manutenzione e hosting",
    ],
  },
];

const method = [
  { step: "01", name: "Discovery", desc: "Analizziamo brand, mercato e obiettivi per costruire fondamenta solide.", icon: Search },
  { step: "02", name: "Strategia", desc: "Definiamo positioning, tone of voice e roadmap operativa.", icon: Compass },
  { step: "03", name: "Produzione", desc: "Creiamo contenuti e attiviamo i canali con esecuzione impeccabile.", icon: Hammer },
  { step: "04", name: "Analisi", desc: "Misuriamo, ottimizziamo e iteriamo per massimizzare i risultati.", icon: LineChart },
];

function MethodPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop horizontal connecting line */}
      <div className="hidden lg:block absolute top-[88px] left-[8%] right-[8%] h-[2px] pointer-events-none">
        <div className="absolute inset-0 rounded-full" style={{ background: "hsl(0 0% 100% / 0.08)" }} />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: lineProgress,
            background: `linear-gradient(90deg, ${CELESTE}, hsl(192 49% 86%))`,
            boxShadow: `0 0 20px ${CELESTE}, 0 0 40px hsl(192 49% 76% / 0.5)`,
          }}
        />
      </div>

      {/* Mobile vertical connecting line */}
      <div className="lg:hidden absolute top-12 bottom-12 left-[34px] w-[2px] pointer-events-none">
        <div className="absolute inset-0 rounded-full" style={{ background: "hsl(0 0% 100% / 0.08)" }} />
        <motion.div
          className="absolute inset-x-0 top-0 rounded-full"
          style={{
            height: lineProgress,
            background: `linear-gradient(180deg, ${CELESTE}, hsl(192 49% 86%))`,
            boxShadow: `0 0 20px ${CELESTE}`,
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-5 relative">
        {method.map((m, i) => {
          const Icon = m.icon;
          const active = activeIdx === i;
          return (
            <motion.div
              key={m.step}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              className="relative pl-20 lg:pl-0"
            >
              {/* Node dot on the path */}
              <motion.div
                className="absolute lg:top-[72px] lg:left-1/2 lg:-translate-x-1/2 top-6 left-[22px] z-10 w-8 h-8"
                animate={{ scale: active ? 1.4 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${CELESTE}, hsl(192 49% 56%))`,
                    boxShadow: active
                      ? `0 0 30px ${CELESTE}, 0 0 60px hsl(192 49% 76% / 0.6)`
                      : `0 0 15px hsl(192 49% 76% / 0.5)`,
                  }}
                  animate={{ rotate: active ? 360 : 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 0% 5%)" }} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ border: `2px solid ${CELESTE}` }}
                  animate={{
                    scale: active ? [1, 2.2, 2.2] : 1,
                    opacity: active ? [0.8, 0, 0] : 0,
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: active ? Infinity : 0,
                    ease: "easeOut",
                  }}
                />
              </motion.div>

              {/* Card */}
              <motion.div
                animate={{ y: active ? -8 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative rounded-2xl p-6 border lg:mt-32 overflow-hidden"
                style={{
                  background: active
                    ? "linear-gradient(160deg, hsl(0 0% 8% / 0.92), hsl(0 0% 4% / 0.98))"
                    : "linear-gradient(160deg, hsl(0 0% 7% / 0.85), hsl(0 0% 4% / 0.95))",
                  borderColor: active ? "hsl(192 49% 76% / 0.4)" : "hsl(0 0% 100% / 0.08)",
                  backdropFilter: "blur(18px)",
                  boxShadow: active
                    ? "0 30px 70px hsl(0 0% 0% / 0.6), 0 0 50px hsl(192 49% 76% / 0.2)"
                    : "0 15px 40px hsl(0 0% 0% / 0.4)",
                  transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: active ? -10 : 0, scale: active ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, hsl(192 49% 76% / 0.4), hsl(192 49% 76% / 0.1))"
                        : "linear-gradient(135deg, hsl(192 49% 76% / 0.2), hsl(192 49% 76% / 0.05))",
                      border: `1px solid hsl(192 49% 76% / ${active ? 0.6 : 0.3})`,
                      transition: "all 0.4s ease",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: CELESTE }} strokeWidth={1.6} />
                  </motion.div>
                  <motion.span
                    className="font-display font-light leading-none"
                    animate={{ scale: active ? 1.08 : 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    style={{
                      fontSize: "2.4rem",
                      WebkitTextStroke: `1px ${CELESTE}`,
                      color: "transparent",
                      textShadow: active ? "0 0 30px hsl(192 49% 76% / 0.6)" : "none",
                    }}
                  >
                    {m.step}
                  </motion.span>
                </div>
                <motion.h3
                  animate={{ x: active ? 4 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-display font-semibold text-xl mb-2 text-foreground"
                  style={{ textShadow: HERO_TEXT_SHADOW }}
                >
                  {m.name}
                </motion.h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "hsl(0 0% 88%)", textShadow: "0 1px 4px hsl(0 0% 0% / 0.6)" }}
                >
                  {m.desc}
                </p>
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${CELESTE}, transparent)` }}
                  animate={{ width: active ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ServicesGrid() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <section className="py-20 px-6">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        style={{ perspective: "1800px" }}
      >
        {services.map((s, i) => (
          <ServiceCard
            key={s.num}
            service={s}
            index={i}
            isHovered={hoveredIdx === i}
            isAnyHovered={hoveredIdx !== null}
            onHoverStart={() => setHoveredIdx(i)}
            onHoverEnd={() => setHoveredIdx((cur) => (cur === i ? null : cur))}
          />
        ))}
      </div>
    </section>
  );
}

const Servizi = () => {
  return (
    <>
      <GlobalVideoBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-12 border"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  Servizi
                </p>
              </div>
              <h1
                className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Quattro pilastri.<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>Un unico obiettivo.</span>
              </h1>
              <p
                className="font-body text-base md:text-lg max-w-2xl"
                style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
              >
                Dalla strategia alla produzione, dalla crescita alla digitalizzazione. Tutto sotto lo stesso tetto, con un metodo chiaro e risultati misurabili.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <ServicesGrid />

        {/* Metodo */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 md:p-10 mb-10 border inline-block"
              style={{
                background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
                borderColor: "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: CELESTE }} />
                <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>
                  Il nostro metodo
                </p>
              </div>
              <h2
                className="font-display font-bold tracking-tight leading-[1.05] text-foreground"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", textShadow: HERO_TEXT_SHADOW }}
              >
                Come<br />
                <span style={{ color: "hsl(0 0% 75%)" }}>lavoriamo.</span>
              </h2>
            </motion.div>

            <MethodPath />
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center rounded-3xl p-10 md:p-14 border"
            style={{
              background: "linear-gradient(160deg, hsl(0 0% 5% / 0.82), hsl(0 0% 3% / 0.92))",
              borderColor: "hsl(0 0% 100% / 0.08)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
            }}
          >
            <h2
              className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", textShadow: HERO_TEXT_SHADOW }}
            >
              Pronto a iniziare?
            </h2>
            <p
              className="font-body text-base md:text-lg mb-4 max-w-xl mx-auto"
              style={{ color: "hsl(0 0% 90%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
            >
              Raccontaci il tuo progetto. Ti ricontattiamo entro 24h con il prossimo step giusto per te.
            </p>
            <InlineCTA label="Prenota una call" to="/contatti" />
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Servizi;
