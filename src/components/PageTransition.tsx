import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// circOut easing for fluid, non-laggy entry
const CIRC_OUT = [0, 0.55, 0.45, 1] as const;

const PageTransition = ({ children, className = "" }: PageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.985, y: 12 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.99, y: -8 }}
    transition={{ duration: 0.6, ease: CIRC_OUT }}
    className={className}
  >
    {children}
  </motion.div>
);

export default PageTransition;
