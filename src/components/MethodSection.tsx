import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Compass, Hammer, Share2, LineChart } from "lucide-react";

const CELESTE = "hsl(192 49% 76%)";
const HERO_TEXT_SHADOW =
  "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)";

const method = [
  { step: "01", name: "Strategia", desc: "Definiamo obiettivi, KPI, tono di voce e piano editoriale su misura per il tuo brand e il tuo pubblico.", icon: Compass },
  { step: "02", name: "Produzione", desc: "Creiamo i contenuti: video, foto, copy e grafiche. Ogni asset è revisionabile prima della pubblicazione.", icon: Hammer },
  { step: "03", name: "Distribuzione", desc: "Pubblichiamo, gestiamo e monitoriamo i contenuti sui canali concordati, ottimizzando in base alle performance.", icon: Share2 },
  { step: "04", name: "Analisi & Report", desc: "Ogni mese ricevi un report dettagliato con i risultati raggiunti, le insight principali e le azioni per il mese successivo.", icon: LineChart },
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-5 relative items-stretch">
        {method.map((m, i) => {
          const Icon = m.icon;
          const active = activeIdx === i;
          return (
            <motion.div
              key={m.step}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              className="relative pl-20 lg:pl-0 h-full flex"
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
                className="relative rounded-2xl p-6 border lg:mt-32 overflow-hidden w-full flex flex-col"
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

const MethodSection = () => {
  return (
    <section className="py-[50px] px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
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
  );
};

export default MethodSection;
