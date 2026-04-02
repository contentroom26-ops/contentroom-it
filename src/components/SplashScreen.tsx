import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import contentRoomIcon from "@/assets/contentroom-icon.png";

interface SplashScreenProps {
  onComplete: () => void;
  navIconRef: React.RefObject<HTMLImageElement | null>;
}

const SplashScreen = ({ onComplete, navIconRef }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"intro" | "move" | "exit">("intro");
  const splashIconRef = useRef<HTMLImageElement>(null);
  const [target, setTarget] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    if (phase === "move" && navIconRef.current && splashIconRef.current) {
      const navRect = navIconRef.current.getBoundingClientRect();
      const splashRect = splashIconRef.current.getBoundingClientRect();

      const dx = navRect.left + navRect.width / 2 - (splashRect.left + splashRect.width / 2);
      const dy = navRect.top + navRect.height / 2 - (splashRect.top + splashRect.height / 2);
      const scaleRatio = navRect.height / splashRect.height;

      setTarget({ x: dx, y: dy, scale: scaleRatio });
    }
  }, [phase, navIconRef]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => {
        if (phase === "exit") onComplete();
      }}
    >
      <motion.img
        ref={splashIconRef}
        src={contentRoomIcon}
        alt=""
        className="h-16 w-auto"
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        animate={
          phase === "intro"
            ? {
                opacity: [0, 1, 1, 1],
                scale: [0, 1.3, 1, 1],
                rotate: [-90, 10, -5, 360],
              }
            : phase === "move"
            ? {
                x: target.x,
                y: target.y,
                scale: target.scale,
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
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }
        }
        onAnimationComplete={() => {
          if (phase === "intro") setPhase("move");
          else if (phase === "move") setPhase("exit");
        }}
      />

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
