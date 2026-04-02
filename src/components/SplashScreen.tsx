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
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative flex items-center justify-center">
          {/* Pittogramma - starts centered, then shifts left */}
          <motion.img
            src={contentRoomIcon}
            alt=""
            className="h-20 md:h-24 w-auto relative z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0, 1.3, 1, 1],
              x: [0, 0, 0, -20],
            }}
            transition={{
              duration: 2.4,
              times: [0, 0.3, 0.5, 0.75],
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Logo text - unfolds/scales out from behind the icon */}
          <motion.div
            className="overflow-hidden relative z-0"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "auto",
              opacity: 1,
            }}
            transition={{
              width: { duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.4, delay: 1.4 },
            }}
          >
            <motion.img
              src={contentRoomLogo}
              alt="Content Room"
              className="h-14 md:h-18 w-auto ml-2"
              initial={{ x: -40, opacity: 0, scale: 0.7 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        </div>

        {/* Curtain reveal - two halves that split open */}
        <motion.div
          className="absolute inset-0 flex pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <motion.div
            className="w-1/2 h-full bg-background"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.9, delay: 3, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="w-1/2 h-full bg-background"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.9, delay: 3, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
