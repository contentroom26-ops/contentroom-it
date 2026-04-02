import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Immersive CSS 3D room that responds to global scroll.
 * Uses CSS perspective + transform-style: preserve-3d for a real 3D corridor.
 */
export default function ImmersiveRoom() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let max = 1;
    const calc = () => {
      max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    calc();
    const onScroll = () => setScrollProgress(window.scrollY / max);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
    };
  }, []);

  // How far we've "walked" into the room (in CSS px)
  const walkZ = scrollProgress * 3000;
  // Subtle camera sway
  const swayX = Math.sin(scrollProgress * 4) * 2;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Perspective container */}
      <div
        style={{
          perspective: "800px",
          perspectiveOrigin: `${50 + swayX * 0.3}% 45%`,
          width: "100%",
          height: "100%",
        }}
      >
        {/* 3D scene wrapper — moves toward us on scroll */}
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${walkZ}px)`,
            width: "100%",
            height: "100%",
            position: "relative",
            transition: "transform 0.05s linear",
          }}
        >
          {/* ── FLOOR ── */}
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "4000px",
              background: "linear-gradient(180deg, #0e0e0e 0%, #080808 100%)",
              transform: "rotateX(90deg) translateZ(-50vh)",
              transformOrigin: "center top",
              top: "50%",
              left: "0",
            }}
          />

          {/* Floor reflection line */}
          <div
            style={{
              position: "absolute",
              width: "2px",
              height: "4000px",
              background: "linear-gradient(180deg, transparent, hsl(38 90% 55% / 0.15), transparent)",
              transform: "rotateX(90deg) translateZ(-50vh)",
              transformOrigin: "center top",
              top: "50%",
              left: "50%",
              marginLeft: "-1px",
            }}
          />

          {/* ── CEILING ── */}
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "4000px",
              background: "linear-gradient(180deg, #060606 0%, #0a0a0a 100%)",
              transform: "rotateX(-90deg) translateZ(-50vh)",
              transformOrigin: "center bottom",
              bottom: "50%",
              left: "0",
            }}
          />

          {/* Ceiling light strip */}
          <div
            style={{
              position: "absolute",
              width: "3px",
              height: "4000px",
              background: "linear-gradient(180deg, hsl(200 80% 74% / 0.6), hsl(200 80% 74% / 0.2), hsl(200 80% 74% / 0.6))",
              transform: "rotateX(-90deg) translateZ(-50vh)",
              transformOrigin: "center bottom",
              bottom: "50%",
              left: "50%",
              marginLeft: "-1.5px",
              boxShadow: "0 0 20px 8px hsl(200 80% 74% / 0.15)",
            }}
          />

          {/* ── LEFT WALL ── */}
          <div
            style={{
              position: "absolute",
              width: "4000px",
              height: "100vh",
              background: "linear-gradient(90deg, #0a0a0a 0%, #131313 50%, #0a0a0a 100%)",
              transform: "rotateY(90deg) translateZ(-50vw)",
              transformOrigin: "left center",
              top: "0",
              left: "0",
            }}
          >
            {/* Wall panels with gold frames */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`l-${i}`}
                style={{
                  position: "absolute",
                  left: `${i * 320 + 60}px`,
                  top: "20%",
                  width: "200px",
                  height: "55%",
                  background: "#0c0c0c",
                  border: "2px solid hsl(38 70% 48% / 0.5)",
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.8), 0 0 15px hsl(38 70% 48% / 0.08)",
                }}
              />
            ))}

            {/* Gold baseboard */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, transparent, hsl(38 90% 55% / 0.3), transparent)",
              }}
            />
          </div>

          {/* ── RIGHT WALL ── */}
          <div
            style={{
              position: "absolute",
              width: "4000px",
              height: "100vh",
              background: "linear-gradient(90deg, #0a0a0a 0%, #131313 50%, #0a0a0a 100%)",
              transform: "rotateY(-90deg) translateZ(-50vw)",
              transformOrigin: "right center",
              top: "0",
              right: "0",
            }}
          >
            {/* Wall panels with gold frames */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`r-${i}`}
                style={{
                  position: "absolute",
                  right: `${i * 320 + 60}px`,
                  top: "20%",
                  width: "200px",
                  height: "55%",
                  background: "#0c0c0c",
                  border: "2px solid hsl(38 70% 48% / 0.5)",
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.8), 0 0 15px hsl(38 70% 48% / 0.08)",
                }}
              />
            ))}

            {/* Gold baseboard */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, transparent, hsl(38 90% 55% / 0.3), transparent)",
              }}
            />
          </div>

          {/* ── END WALL ── */}
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              background: "radial-gradient(ellipse at center, #111 0%, #080808 70%)",
              transform: "translateZ(-3800px)",
              top: "0",
              left: "0",
            }}
          >
            {/* End wall glow */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                width: "200px",
                height: "200px",
                marginLeft: "-100px",
                borderRadius: "50%",
                background: "radial-gradient(circle, hsl(200 80% 74% / 0.3) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* ── Corridor cross-beams (depth markers) ── */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`beam-${i}`}
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                transform: `translateZ(${-i * 250}px)`,
                top: "0",
                left: "0",
                pointerEvents: "none",
              }}
            >
              {/* Top beam */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "4px",
                  background: "hsl(0 0% 15%)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              />
              {/* Bottom beam */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  height: "3px",
                  background: "hsl(0 0% 12%)",
                }}
              />
              {/* Left pillar */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "6px",
                  height: "100%",
                  background: "linear-gradient(180deg, #1a1a1a, #111, #1a1a1a)",
                }}
              />
              {/* Right pillar */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "6px",
                  height: "100%",
                  background: "linear-gradient(180deg, #1a1a1a, #111, #1a1a1a)",
                }}
              />
              {/* Ceiling light dot */}
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  left: "50%",
                  width: "30px",
                  height: "6px",
                  marginLeft: "-15px",
                  background: "hsl(200 80% 74% / 0.7)",
                  borderRadius: "3px",
                  boxShadow: "0 0 20px 5px hsl(200 80% 74% / 0.2), 0 5px 40px 10px hsl(200 80% 74% / 0.08)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 3% / 0.6) 100%)",
        }}
      />
    </div>
  );
}
