import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 2800);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Massive typography reveal */}
      <div className="relative overflow-hidden">
        <motion.h1
          className="font-display font-bold text-foreground leading-none select-none"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
          initial={{ y: "110%" }}
          animate={phase !== "logo" ? { y: "-110%" } : { y: "0%" }}
          transition={
            phase === "logo"
              ? { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
              : { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }
        >
          content
          <span className="text-primary">room</span>
          <span className="text-primary">.</span>
        </motion.h1>
      </div>

      {/* Subtitle */}
      <motion.p
        className="absolute bottom-12 font-body text-muted-foreground text-xs tracking-[0.4em] uppercase"
        initial={{ opacity: 0 }}
        animate={phase === "logo" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: phase === "logo" ? 1.2 : 0 }}
      >
        Creative Digital Agency
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
