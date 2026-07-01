import { useEffect, useRef } from "react";

const SPOTLIGHT_RADIUS = 200;

const HeroSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();
  const tRef = useRef<number>(0);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (reducedMotion) {
      // Posizione fissa al centro, nessuna animazione
      if (revealRef.current) {
        revealRef.current.style.setProperty("--x", `${cx}px`);
        revealRef.current.style.setProperty("--y", `${cy}px`);
      }
      return;
    }

    if (canHover) {
      // ── DESKTOP: spotlight segue il mouse ──
      smooth.current = { x: cx, y: cy };
      mouse.current = { x: cx, y: cy };

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

    } else {
      // ── MOBILE / TOUCH: lemniscata automatica ──
      // Lemniscata di Bernoulli scalata sull'area disponibile.
      // rx = raggio orizzontale (65% della metà larghezza),
      // ry = raggio verticale (35% della metà altezza) — più schiacciata
      // perché lo schermo mobile è alto e stretto.
      // Un giro completo in ~8s.
      const rx = rect.width  * 0.32;
      const ry = rect.height * 0.18;
      const PERIOD = 6000; // ms per giro completo

      let lastTs: number | null = null;

      const loop = (ts: number) => {
        if (lastTs === null) lastTs = ts;
        tRef.current += (ts - lastTs) / PERIOD * (2 * Math.PI);
        lastTs = ts;

        // Parametrizzazione lemniscata: x = a·cos(t)/(1+sin²(t)), y = a·sin(t)·cos(t)/(1+sin²(t))
        const denom = 1 + Math.sin(tRef.current) ** 2;
        const lx = cx + rx * (Math.cos(tRef.current) / denom);
        const ly = cy + ry * (Math.sin(tRef.current) * Math.cos(tRef.current) / denom);

        if (revealRef.current) {
          revealRef.current.style.setProperty("--x", `${lx}px`);
          revealRef.current.style.setProperty("--y", `${ly}px`);
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-black">
      {/* Grana sottile — layer base */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer reveal — pattern celeste, visibile solo dentro la spotlight */}
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

      {/* Overlay leggibilità testo */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />
    </div>
  );
};

export default HeroSpotlight;
