import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import contentRoomLogo from "@/assets/contentroom-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"door" | "hero" | "enter" | "done">("door");

  useEffect(() => {
    // Phase 1: Door opens (1.5s)
    const t1 = setTimeout(() => setPhase("hero"), 100);
    // Phase 2: Hero visible (show logo + slogan for 2.5s)
    const t2 = setTimeout(() => setPhase("enter"), 3000);
    // Phase 3: Camera enters room (1.2s)
    const t3 = setTimeout(() => setPhase("done"), 4200);
    // Done
    const t4 = setTimeout(() => onComplete(), 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dark room background */}
      <div className="absolute inset-0 bg-background" />

      {/* Door frame — two panels that open */}
      <motion.div
        className="absolute inset-0 z-30 flex"
        style={{ pointerEvents: "none" }}
      >
        {/* Left door */}
        <motion.div
          className="w-1/2 h-full origin-left"
          style={{ background: "hsl(0 0% 3%)", borderRight: "1px solid hsl(0 0% 12%)" }}
          initial={{ rotateY: 0 }}
          animate={phase !== "door" ? { rotateY: -85 } : { rotateY: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Door panel detail */}
          <div className="absolute inset-8 border border-border/20 rounded-sm" />
          <div className="absolute inset-16 border border-border/10 rounded-sm" />
          {/* Door handle */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-full bg-primary/40" />
        </motion.div>

        {/* Right door */}
        <motion.div
          className="w-1/2 h-full origin-right"
          style={{ background: "hsl(0 0% 3%)", borderLeft: "1px solid hsl(0 0% 12%)" }}
          initial={{ rotateY: 0 }}
          animate={phase !== "door" ? { rotateY: 85 } : { rotateY: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="absolute inset-8 border border-border/20 rounded-sm" />
          <div className="absolute inset-16 border border-border/10 rounded-sm" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-full bg-primary/40" />
        </motion.div>
      </motion.div>

      {/* Light spill from inside the room */}
      <motion.div
        className="absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        animate={phase !== "door" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{
          background: "radial-gradient(ellipse at center, hsl(38 90% 55% / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Hero content — logo and slogan */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={
          phase === "hero"
            ? { opacity: 1, scale: 1, y: 0 }
            : phase === "enter" || phase === "done"
            ? { opacity: 0, scale: 1.2, y: -40 }
            : { opacity: 0, scale: 0.8, y: 30 }
        }
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={contentRoomLogo}
          alt="Content Room"
          className="h-32 md:h-48 w-auto"
          initial={{ filter: "blur(20px)" }}
          animate={phase === "hero" ? { filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
        />

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, width: 0 }}
          animate={phase === "hero" ? { opacity: 1, width: "auto" } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <p className="text-muted-foreground text-xs md:text-sm tracking-[0.35em] uppercase font-body whitespace-nowrap">
            Il tuo brand, la nostra visione
          </p>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        <motion.p
          className="text-foreground/60 text-sm md:text-base max-w-md font-body leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={phase === "hero" ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Creiamo contenuti che trasformano idee in esperienze digitali straordinarie.
        </motion.p>
      </motion.div>

      {/* Camera zoom-in effect */}
      <motion.div
        className="absolute inset-0 z-5"
        initial={{ scale: 1 }}
        animate={
          phase === "enter" || phase === "done"
            ? { scale: 3, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "radial-gradient(circle at center, transparent 30%, hsl(0 0% 2%) 100%)",
        }}
      />

      {/* Ambient particles during hero */}
      {(phase === "hero") && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30 z-10"
              initial={{
                x: `${Math.random() * 100 - 50}vw`,
                y: `${Math.random() * 100 - 50}vh`,
                opacity: 0,
              }}
              animate={{
                y: [`${30 + Math.random() * 40}vh`, `${10 + Math.random() * 30}vh`],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: 0.5 + i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default SplashScreen;
