import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CELESTE = "hsl(192 49% 76%)";

const stats = [
  { value: 500, suffix: "k", prefix: "+", label: "Visualizzazioni generate" },
  { value: 300, suffix: "%", prefix: "+", label: "Engagement medio" },
  { value: 50, suffix: "", prefix: "+", label: "Clienti gestiti" },
];

const AnimatedCounter = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
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
      className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-white"
      style={{ textShadow: "0 2px 24px hsl(0 0% 0% / 0.85), 0 0 48px hsl(0 0% 0% / 0.6)" }}
    >
      {prefix}{count}{suffix}
    </span>
  );
};

const ResultsSection = () => (
  <section className="py-32 px-6 relative overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: CELESTE }} />
          <p className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: CELESTE }}>Risultati</p>
        </div>
        <h2
          className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-20 text-white"
          style={{ textShadow: "0 2px 20px hsl(0 0% 0% / 0.8), 0 0 40px hsl(0 0% 0% / 0.6)" }}
        >
          I numeri parlano.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ perspective: "1000px" }}
            className="text-center md:text-left"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            <p className="font-body text-base mt-3" style={{ color: "hsl(0 0% 88%)", textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
