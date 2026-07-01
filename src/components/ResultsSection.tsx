import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import InlineCTA from "./InlineCTA";

const stats = [
  { value: 5, suffix: "M", prefix: "+", label: "Visualizzazioni generate" },
  { value: 200, suffix: "", prefix: "+", label: "Video prodotti" },
  { value: 20, suffix: "", prefix: "+", label: "Clienti seguiti" },
];

const AnimatedCounter = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) { setCount(0); return; }
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="font-display font-black text-6xl md:text-7xl lg:text-8xl"
    >
      {prefix}{count}{suffix}
    </span>
  );
};

const ResultsSection = () => (
  <section className="section-light relative px-6 py-20 md:py-28 overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-0.5 bg-brand-orange" />
          <span className="font-body font-bold text-xs tracking-[0.4em] uppercase text-brand-orange">
            Risultati
          </span>
        </div>
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-20">
          I numeri <span className="text-primary">parlano.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ perspective: "1000px" }}
            className="text-center md:text-left"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            <p className="font-body text-base mt-3 text-[hsl(0_0%_30%)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <InlineCTA
        caption="Pronti a far parlare anche i vostri numeri? Raccontaci il tuo progetto."
        label="Prenota una call"
        to="/contatti"
      />
    </div>
  </section>
);

export default ResultsSection;
