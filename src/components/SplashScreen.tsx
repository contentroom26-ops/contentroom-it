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
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center justify-center">
          {/* Pittogramma - appears, then fades into logo */}
          <motion.img
            src={contentRoomIcon}
            alt=""
            className="h-20 md:h-24 w-auto absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.1, 1, 0.8],
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.6, 0.85],
              ease: "easeInOut",
            }}
          />

          {/* Logo - fades in as icon fades out */}
          <motion.img
            src={contentRoomLogo}
            alt="Content Room"
            className="h-16 md:h-20 w-auto"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={onComplete}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
