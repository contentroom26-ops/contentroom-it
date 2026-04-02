import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.8)" }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(0 0% 3% / 0.3) 0%, hsl(0 0% 3% / 0.1) 40%, hsl(0 0% 3% / 0.8) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10 max-w-7xl mx-auto"
        style={{ y: textY, opacity }}
      >
        {/* Massive typography */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1
            className="font-display font-bold text-foreground leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}
          >
            content
            <br />
            <span className="text-primary">made easy.</span>
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
            Niente contenuti copia-incolla. Solo strategie su misura, 
            creatività autentica e risultati che fanno la differenza.
          </p>

          {/* Info card (like hostviaggi weather card) */}
          <div
            className="flex items-center gap-4 rounded-2xl px-6 py-4 max-w-sm"
            style={{
              background: "hsl(0 0% 100% / 0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
            }}
          >
            <div className="text-center">
              <span className="font-display font-bold text-3xl text-primary block">50+</span>
              <span className="font-body text-[10px] text-muted-foreground tracking-wider uppercase">Clienti</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <span className="font-display font-bold text-3xl text-foreground block">500k</span>
              <span className="font-body text-[10px] text-muted-foreground tracking-wider uppercase">Views</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <span className="font-display font-bold text-3xl text-foreground block">+300%</span>
              <span className="font-body text-[10px] text-muted-foreground tracking-wider uppercase">Engagement</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ArrowDown size={16} className="text-muted-foreground/50" />
      </motion.div>
    </section>
  );
}
