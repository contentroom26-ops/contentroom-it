import { useEffect, useRef } from "react";

const SPOTLIGHT_RADIUS = 260; // px

const HeroSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Su touch o reduced-motion: niente listener, resta solo il layer nero base
    if (!canHover || reducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    smooth.current = { x: rect.width / 2, y: rect.height / 2 };
    mouse.current = { x: rect.width / 2, y: rect.height / 2 };

    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", handleMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      if (revealRef.current) {
        revealRef.current.style.setProperty("--x", `${smooth.current.x}px`);
        revealRef.current.style.setProperty("--y", `${smooth.current.y}px`);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-black">
      {/* Layer base: nero pieno con grana sottile, estetica editoriale */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer reveal: pattern celeste pieno, visibile solo dentro la spotlight */}
      <div
        ref={revealRef}
        className="absolute inset-0"
        style={
          {
            "--x": "50%",
            "--y": "50%",
            background:
              "repeating-linear-gradient(135deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 14px)",
            backgroundColor: "hsl(var(--primary) / 0.14)",
            WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at var(--x) var(--y), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`,
            maskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at var(--x) var(--y), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`,
          } as React.CSSProperties
        }
      />

      {/* Overlay leggibilità testo — stesso valore usato dal video precedente */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />
    </div>
  );
};

export default HeroSpotlight;
