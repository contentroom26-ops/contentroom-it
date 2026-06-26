import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Aperture, Share2, Rocket, Code2, BrainCircuit, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import InlineCTA from "./InlineCTA";

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
      className="relative rounded-2xl border overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: isOpen ? "hsl(192 49% 76%)" : "hsl(0 0% 100%)",
        borderColor: isOpen ? "hsl(192 49% 76%)" : "hsl(0 0% 8% / 0.12)",
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
            WebkitTextStroke: `1px ${isOpen ? "hsl(192 35% 16%)" : "hsl(0 0% 75%)"}`,
            color: "transparent",
            transition: "all 0.3s ease",
          }}
        >
          {service.num}
        </span>

        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
          style={{
            backgroundColor: isOpen ? "hsl(192 35% 16% / 0.12)" : "hsl(0 0% 8% / 0.05)",
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: isOpen ? "hsl(192 35% 16%)" : "hsl(0 0% 40%)" }}
            strokeWidth={1.5}
          />
        </div>

        <h3
          className="font-display font-bold flex-1 leading-tight transition-colors duration-300"
          style={{
            fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            color: isOpen ? "hsl(192 35% 16%)" : "hsl(0 0% 10%)",
          }}
        >
          {service.title}
        </h3>

        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform duration-300"
          style={{
            color: isOpen ? "hsl(192 35% 16%)" : "hsl(0 0% 40%)",
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
              <p className="font-body text-sm md:text-base leading-relaxed mb-5 text-[hsl(192_35%_16%)]">
                {service.desc}
              </p>
              <Link
                to={service.to}
                className="inline-flex items-center gap-2 font-body text-sm font-bold tracking-wide transition-all duration-300 hover:gap-3 text-[hsl(192_35%_16%)]"
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
    <section className="section-light px-6 relative py-20 md:py-28">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-brand-orange" />
            <span className="font-body font-bold text-xs tracking-[0.4em] uppercase text-brand-orange">
              Servizi
            </span>
          </div>
          <h2
            className="font-display font-black tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            I nostri
            <br />
            <span className="text-primary">servizi.</span>
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
