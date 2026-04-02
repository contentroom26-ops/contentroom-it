import { useEffect, useState } from "react";
import corridorBg from "@/assets/corridor-room.jpg";

/**
 * Fixed corridor background that scales up as you scroll,
 * creating the illusion of walking toward the end wall.
 */
export default function ImmersiveRoom() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let max = 1;
    const calc = () => {
      max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    calc();
    const onScroll = () => setProgress(window.scrollY / max);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
    };
  }, []);

  // Scale from 1 → 2.8 as user scrolls to bottom
  const scale = 1 + progress * 1.8;
  // Slight upward shift to keep vanishing point centered
  const translateY = progress * -8;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <img
        src={corridorBg}
        alt=""
        className="w-full h-full object-cover will-change-transform"
        style={{
          transform: `scale(${scale}) translateY(${translateY}%)`,
          filter: `brightness(${0.85 - progress * 0.25})`,
          transition: "transform 0.15s ease-out, filter 0.15s ease-out",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.6) 100%)",
        }}
      />
    </div>
  );
}
