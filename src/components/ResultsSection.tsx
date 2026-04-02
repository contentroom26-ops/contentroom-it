import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: 500, suffix: "k", prefix: "+", label: "Visualizzazioni generate" },
  { value: 300, suffix: "%", prefix: "+", label: "Engagement medio" },
  { value: 50, suffix: "", prefix: "+", label: "Clienti gestiti" },
];

const AnimatedCounter = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
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
    <span ref={ref} className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-foreground">
      {prefix}{count}{suffix}
    </span>
  );
};

const ResultsSection = () => (
  <section className="py-32 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
    <div className="max-w-6xl mx-auto relative z-10">
      <ScrollReveal>
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">Risultati</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-20">
          I numeri parlano.
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.15}>
            <div className="text-center md:text-left">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="text-muted-foreground font-body text-base mt-3">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
