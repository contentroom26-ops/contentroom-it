import { useEffect, useRef } from "react";
import corridorBg from "@/assets/corridor-room.jpg";

/**
 * Immersive corridor using CSS 3D perspective + translateZ
 * for a realistic first-person walk effect with head-bob.
 */
export default function ImmersiveRoom() {
  const sceneRef = useRef<HTMLDivElement>(null);
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

    const tick = () => {
      currentRef.current += (progressRef.current - currentRef.current) * 0.045;
      const p = currentRef.current;

      // Walk forward via translateZ
      const walkZ = p * 420;
      // Subtle head bob
      const bobY = Math.sin(p * Math.PI * 6) * (1.5 - p * 1.2);
      const bobX = Math.cos(p * Math.PI * 3) * (0.8 - p * 0.6);
      // Slight tilt
      const tiltZ = Math.sin(p * Math.PI * 4) * (0.3 - p * 0.2);
      const brightness = 0.9 - p * 0.35;

      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `translateZ(${walkZ}px) translateY(${bobY}px) translateX(${bobX}px) rotateZ(${tiltZ}deg)`;
        sceneRef.current.style.filter = `brightness(${brightness})`;
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
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        zIndex: 0,
        perspective: "600px",
        perspectiveOrigin: "50% 48%",
      }}
    >
      <div
        ref={sceneRef}
        className="absolute will-change-transform"
        style={{
          /* Oversized plane so zoom-in doesn't reveal edges */
          width: "160vw",
          height: "160vh",
          left: "-30vw",
          top: "-30vh",
          backgroundImage: `url(${corridorBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
          transformOrigin: "center center",
        }}
      />

      {/* Depth fog overlay — darkens edges for tunnel feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at center 48%, transparent 30%, hsl(0 0% 0% / 0.7) 100%),
            linear-gradient(180deg, hsl(0 0% 0% / 0.15) 0%, transparent 20%, transparent 80%, hsl(0 0% 0% / 0.3) 100%)
          `,
        }}
      />
    </div>
  );
}
