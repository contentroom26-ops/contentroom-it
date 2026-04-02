import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import tunnelBg from "@/assets/tunnel-bg.jpg";

const TunnelSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Simulate moving forward: scale up the image as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.8, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.4]);
  const brightnessFilter = useMotionTemplate`brightness(${brightness})`;
  const textY = useTransform(scrollYProgress, [0.3, 0.55], ["40px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.7, 0.85], [0, 1, 1, 0]);
  const vignette = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.9]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Tunnel image with scale effect */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 will-change-transform"
        >
          <motion.img
            src={tunnelBg}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: brightness.get()
                ? `brightness(${brightness.get()})`
                : undefined,
            }}
          />
        </motion.div>

        {/* Dynamic vignette overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 20%, hsl(0 0% 5% / var(--v)))`,
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 20%, hsl(var(--background)) 75%)",
              opacity: vignette,
            }}
          />
        </motion.div>

        {/* Top/bottom gradient blends */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

        {/* Center text overlay */}
        <motion.div
          className="relative z-20 text-center px-6"
          style={{ y: textY, opacity: textOpacity }}
        >
          <p className="text-primary font-body text-xs tracking-[0.4em] uppercase mb-4">
            Portfolio
          </p>
          <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-foreground">
            La nostra galleria.
          </h2>
          <p className="text-muted-foreground/70 font-body text-sm md:text-base mt-4 max-w-md mx-auto">
            Scorri per esplorare i nostri lavori
          </p>
        </motion.div>

        {/* Subtle scan lines for atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 3px)",
          }}
        />
      </div>
    </section>
  );
};

export default TunnelSection;
