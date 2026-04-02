import { useEffect, useRef } from "react";
import corridorBg from "@/assets/corridor-room.jpg";

/**
 * Fixed corridor background with smooth RAF-driven zoom
 * simulating walking toward the end wall.
 */
export default function ImmersiveRoom() {
  const imgRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    let max = 1;
    const calc = () => {
      max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    calc();

    const onScroll = () => {
      progressRef.current = window.scrollY / max;
    };

    // Lerp loop for buttery smooth interpolation
    const tick = () => {
      // Ease toward target (lower = smoother, higher = snappier)
      currentRef.current += (progressRef.current - currentRef.current) * 0.06;

      const p = currentRef.current;
      const scale = 1 + p * 2.2;
      const ty = p * -6;
      const brightness = 0.88 - p * 0.3;

      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${scale}) translateY(${ty}%)`;
        imgRef.current.style.filter = `brightness(${brightness})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <div
        ref={imgRef}
        className="w-full h-full will-change-transform"
        style={{
          backgroundImage: `url(${corridorBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transformOrigin: "center 45%",
        }}
      />
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
