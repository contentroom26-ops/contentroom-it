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
        {/* Glow behind icon */}
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 3, 2.5], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.2, delay: 0.3, ease: "easeOut" }}
        />

        {/* Ring burst */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border-2 border-primary/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 4], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        />

        <div className="flex flex-col items-center">
          {/* Pittogramma - starts spinning and scaling in */}
          <motion.img
            src={contentRoomIcon}
            alt=""
            className="h-20 md:h-28 w-auto"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0, 1.2, 1, 0.6],
              rotate: [-180, 0, 0, 0],
              y: [0, 0, 0, -10],
            }}
            transition={{
              duration: 2.4,
              times: [0, 0.35, 0.6, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Logo text - appears after icon settles */}
          <motion.img
            src={contentRoomLogo}
            alt="Content Room"
            className="h-16 md:h-20 w-auto mt-4"
            initial={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Tagline */}
          <motion.p
            className="text-muted-foreground font-body text-xs md:text-sm tracking-[0.3em] uppercase mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            Content Creation & Social Media
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="w-32 h-px bg-border mt-8 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 2.5, ease: "easeInOut" }}
              onAnimationComplete={onComplete}
            />
          </motion.div>
        </div>

        {/* Corner accents */}
        {[
          "top-8 left-8",
          "top-8 right-8 rotate-90",
          "bottom-8 left-8 -rotate-90",
          "bottom-8 right-8 rotate-180",
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-8 h-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
          >
            <div className="w-full h-px bg-primary/40" />
            <div className="w-px h-full bg-primary/40" />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
