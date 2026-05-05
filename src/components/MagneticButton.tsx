import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
  as?: "div" | "span";
}

/**
 * Subtle magnetic cursor effect — element snaps toward cursor
 * within a given radius using a high-damping spring.
 */
const MagneticButton = ({
  children,
  className = "",
  radius = 50,
  strength = 0.35,
  as = "div",
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius + Math.max(rect.width, rect.height) / 2) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      ref={ref as never}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default MagneticButton;
