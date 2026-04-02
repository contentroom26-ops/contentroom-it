import { motion } from "framer-motion";
import { useState } from "react";
import contentRoomIcon from "@/assets/contentroom-icon.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"intro" | "move" | "exit">("intro");

  // Target: navbar icon position (top-left, with padding)
  // Navbar: px-6 py-4, icon h-16, flex items-center
  // Approx target: left ~24px + half icon, top ~16px + half icon
  const navIconX = -(window.innerWidth / 2 - 56);
  const navIconY = -(window.innerHeight / 2 - 40);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (phase === "exit") onComplete();
      }}
    >
      <motion.img
        src={contentRoomIcon}
        alt=""
        className="h-16 w-auto"
        // Phase 1: intro animation (3s)
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        animate={
          phase === "intro"
            ? {
                opacity: [0, 1, 1, 1],
                scale: [0, 1.3, 1, 1],
                rotate: [-90, 10, -5, 0],
              }
            : phase === "move"
            ? {
                x: navIconX,
                y: navIconY,
                scale: 1,
                opacity: 1,
              }
            : {}
        }
        transition={
          phase === "intro"
            ? {
                duration: 3,
                times: [0, 0.3, 0.6, 1],
                ease: "easeInOut",
              }
            : {
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
              }
        }
        onAnimationComplete={() => {
          if (phase === "intro") setPhase("move");
          else if (phase === "move") setPhase("exit");
        }}
      />

      {/* Subtle pulsing glow during intro */}
      {phase === "intro" && (
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
};

export default SplashScreen;
