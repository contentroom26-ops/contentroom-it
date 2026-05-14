import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CELESTE = "hsl(192 49% 76%)";
const HERO_TEXT_SHADOW =
  "0 2px 8px hsl(0 0% 0% / 0.85), 0 0 28px hsl(0 0% 0% / 0.6)";

const ChiSiamoSection = () => {
  return (
    <section
      id="chi-siamo"
      aria-labelledby="chi-siamo-title"
      className="px-6 relative py-[40px]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-8 md:p-14 border"
          style={{
            background: "linear-gradient(160deg, hsl(0 0% 5% / 0.78), hsl(0 0% 3% / 0.9))",
            borderColor: "hsl(0 0% 100% / 0.08)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ background: CELESTE }} />
            <p
              className="font-body font-bold text-xs tracking-[0.4em] uppercase"
              style={{ color: CELESTE }}
            >
              Chi siamo
            </p>
          </div>

          <h2
            id="chi-siamo-title"
            className="font-display font-bold tracking-tight leading-[1.05] mb-6 text-foreground"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", textShadow: HERO_TEXT_SHADOW }}
          >
            Una stanza dove<br />
            <span style={{ color: "hsl(0 0% 75%)" }}>nascono le idee.</span>
          </h2>

          <p
            className="font-body text-base md:text-lg max-w-2xl mb-4"
            style={{ color: "hsl(0 0% 92%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
          >
            Content Room è un'agenzia di comunicazione e marketing con base a Firenze.
            Uniamo strategia, contenuto e tecnologia per costruire brand riconoscibili
            e generare risultati misurabili.
          </p>
          <p
            className="font-body text-sm md:text-base max-w-2xl mb-8"
            style={{ color: "hsl(0 0% 80%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}
          >
            Crediamo in una creatività con metodo: ogni progetto parte da un'idea forte
            e arriva fino al dato che la conferma.
          </p>

          <Link
            to="/chisiamo"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide group"
            style={{ color: CELESTE }}
          >
            <span className="relative">
              Scopri la nostra storia
              <span
                className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: CELESTE }}
              />
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ChiSiamoSection;
