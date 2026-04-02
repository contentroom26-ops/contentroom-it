import { motion, AnimatePresence } from "framer-motion";
import contentRoomIcon from "@/assets/contentroom-icon.png";
import contentRoomLogo from "@/assets/contentroom-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Radial pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border border-primary/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 5 + i * 2], opacity: [0.4, 0] }}
            transition={{ duration: 2, delay: 0.6 + i * 0.3, ease: "easeOut" }}
          />
        ))}

        <div className="flex items-center gap-4">
          {/* Pittogramma - drops in from above with bounce */}
          <motion.img
            src={contentRoomIcon}
            alt=""
            className="h-20 md:h-24 w-auto"
            initial={{ opacity: 0, y: -120, scale: 0.5 }}
            animate={{
              opacity: 1,
              y: [null, 10, -5, 0],
              scale: [0.5, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Divider line that draws itself */}
          <motion.div
            className="w-px bg-primary/40"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 48, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          />

          {/* Logo slides in from right */}
          <motion.img
            src={contentRoomLogo}
            alt="Content Room"
            className="h-14 md:h-18 w-auto"
            initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        {/* Progress dot trail */}
        <div className="absolute bottom-16 flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/40"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.3],
                scale: [0, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                delay: 2 + i * 0.15,
                ease: "easeOut",
              }}
              onAnimationComplete={i === 4 ? onComplete : undefined}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
