import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  staggerChildren?: number;
  as?: "div" | "section" | "ul" | "ol";
}

// Cinematic cubic-bezier for organic mask-reveal feel
const EASE = [0.33, 1, 0.68, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: (staggerChildren: number = 0.12) => ({
    transition: { staggerChildren, delayChildren: 0.05 },
  }),
};

export const maskRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  stagger = false,
  staggerChildren = 0.12,
  as = "div",
}: ScrollRevealProps) => {
  const MotionTag = motion[as] as typeof motion.div;

  if (stagger) {
    return (
      <MotionTag
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
        custom={staggerChildren}
        className={className}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollReveal;
