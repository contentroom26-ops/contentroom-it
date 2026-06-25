import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Aperture, Share2, Rocket, Code2, BrainCircuit, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import InlineCTA from "./InlineCTA";

const CELESTE = "hsl(192 49% 76%)";

const services = [
  {
    icon: Aperture,
    num: "01",
    title: "Content Creation",
    desc: "Produciamo video, foto e grafiche che catturano l'attenzione e raccontano il tuo brand. Dal concept alla pubblicazione, contenuti originali e ottimizzati per ogni piattaforma.",
    to: "/content-creation",
  },
  {
    icon: Share2,
    num: "02",
    title: "Social Media Management",
    desc: "Gestiamo i tuoi canali social con un piano editoriale su misura, contenuti pianificati e analisi costante delle performance.",
    to: "/social-media-management",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Growth & Marketing",
    desc: "Strategie data-driven e campagne ads su Meta, Google e TikTok per scalare il tuo business online, con il ROI sempre sotto controllo.",
    to: "/growth-marketing",
  },
  {
    icon: Code2,
    num: "04",
    title: "Siti & Digitalizzazione",
    desc: "Siti web ad alte prestazioni, funnel di acquisizione e automazioni intelligenti, con e senza AI, per semplificare i processi e aumentare la produttività.",
    to: "/siti-digitalizzazione",
  },
  {
    icon: BrainCircuit,
    num: "05",
    title: "Automazione & AI",
    desc: "Chatbot, assistenti virtuali e flussi automatici che lavorano per il tuo brand 24 ore su 24, mentre tu ti concentri sulla strategia.",
    to: "/automazione-ai",
  },
];

function ServiceRow({
  service,
  isOpen,
  onToggle,
}: {
  service: (typeof services)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;

  return (
    <div
      className="relative rounded-2xl border overflow-hidden"
      style={{
        background: isOpen
          ? "linear-gradient(160deg, hsl(0 0% 8% / 0.92), hsl(0 0% 4% / 0.98))"
          : "linear-gradient(160deg, hsl(0 0% 7% / 0.8), hsl(0 0% 4% / 0.92))",
        borderColor: isOpen ? "hsl(192 49% 76% / 0.35)" : "hsl(0 0% 100% / 0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: isOpen ? "0 20px 50px hsl(0 0% 0% / 0.5)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Trigger row */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-5 md:gap-6 px-5 md:px-8 py-5 md:py-6 text-left"
      >
        <span
          className="font-display font-light leading-none shrink-0 hidden sm:block"
          style={{
            fontSize: "clamp(2rem, 4vw, 2.6rem)",
            WebkitTextStroke: `1px ${isOpen ? CELESTE : "hsl(0 0% 30%)"}`,
            color: "transparent",
            transition: "all 0.4s ease",
          }}
        >
          {service.num}
        </span>

        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, hsl(192 49% 76% / 0.25), hsl(192 49% 76% / 0.08))"
              : "hsl(0 0% 100% / 0.04)",
            border: `1px solid ${isOpen ? "hsl(192 49% 76% / 0.4)" : "hsl(0 0% 100% / 0.08)"}`,
            transition: "all 0.4s ease",
          }}
        >
          <Icon className="w-5 h-5" style={{ color: isOpen ? CELESTE : "hsl(0 0% 60%)" }} strokeWidth={1.5} />
        </div>

        <h3
          className="font-display font-semibold flex-1 leading-tight"
          style={{
            fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            color: isOpen ? CELESTE : "hsl(0 0% 92%)",
            transition: "color 0.4s ease",
          }}
        >
          {service.title}
        </h3>

        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform duration-400"
          style={{
            color: isOpen ? CELESTE : "hsl(0 0% 60%)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-8 pb-6 md:pb-8 pl-[4.5rem] sm:pl-[5.5rem] md:pl-[6.5rem] pr-5 md:pr-8">
              <p
                className="font-body text-sm md:text-base leading-relaxed mb-5"
                style={{ color: "hsl(0 0% 85%)" }}
              >
                {service.desc}
              </p>
              <Link
                to={service.to}
                className="inline-flex items-center gap-2 font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:gap-3"
                style={{ color: CELESTE }}
              >
                Scopri di più
                <ArrowRight className="w-4 h-4 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ServicesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-6 relative py-[50px]">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.88))",
            border: "1px solid hsl(0 0% 100% / 0.08)",
            backdropFilter: "blur(18px)",
            borderRadius: "24px",
          }}
          className="inline-block mb-12 p-8 md:p-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5" style={{ background: CELESTE }} />
            <span
              className="font-body font-bold text-xs tracking-[0.4em] uppercase"
              style={{
                color: CELESTE,
                textShadow:
                  "0 1px 3px hsl(0 0% 0% / 0.95), 0 2px 12px hsl(0 0% 0% / 0.85), 0 0 24px hsl(0 0% 0% / 0.7)",
              }}
            >
              Servizi
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[1.05] text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              textShadow: "0 2px 20px hsl(0 0% 0% / 0.8), 0 0 40px hsl(0 0% 0% / 0.6)",
            }}
          >
            I nostri
            <br />
            <span style={{ color: "hsl(0 0% 80%)" }}>servizi.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 md:gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServiceRow
                service={s}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              />
            </motion.div>
          ))}
        </div>

        <InlineCTA
          caption="Non sai da dove iniziare? Parliamone insieme."
          label="Prenota una call"
          to="/contatti"
        />
      </div>
    </section>
  );
};

export default ServicesSection;
