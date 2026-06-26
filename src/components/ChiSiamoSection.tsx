import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ChiSiamoSection = () => {
  return (
    <section
      id="chi-siamo"
      aria-labelledby="chi-siamo-title"
      className="section-light px-6 relative py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-brand-orange" />
            <p className="font-body font-bold text-xs tracking-[0.4em] uppercase text-brand-orange">
              Chi siamo
            </p>
          </div>

          <h2
            id="chi-siamo-title"
            className="font-display font-black tracking-tight leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Idee forti.{" "}
            <span className="text-primary">Risultati misurabili.</span>
          </h2>

          <p className="font-body text-base md:text-lg max-w-2xl mb-4 text-[hsl(0_0%_15%)]">
            Content Room è l'agenzia specializzata in digitalizzazione delle
            aziende, content strategy e produzione video, con base a Firenze.
            Uniamo strategia, contenuto e tecnologia per costruire brand
            riconoscibili e far crescere il business che c'è dietro.
          </p>
          <p className="font-body text-sm md:text-base max-w-2xl mb-8 text-[hsl(0_0%_30%)]">
            Crediamo in una creatività con metodo: ogni progetto parte da
            un'idea forte e arriva fino al dato che la conferma.
          </p>

          <Link
            to="/chisiamo"
            className="inline-flex items-center gap-2 font-body text-sm font-bold tracking-wide group text-[hsl(0_0%_8%)]"
          >
            <span className="relative">
              Scopri il nostro metodo
              <span className="absolute left-0 -bottom-0.5 h-px w-full bg-[hsl(0_0%_8%)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ChiSiamoSection;
