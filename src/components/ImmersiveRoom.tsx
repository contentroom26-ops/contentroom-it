import { useEffect, useState } from "react";
import textureWall from "@/assets/texture-wall.jpg";
import textureFloor from "@/assets/texture-floor.jpg";
import textureCeiling from "@/assets/texture-ceiling.jpg";

/**
 * Immersive CSS 3D room with realistic textures that responds to global scroll.
 * Anthracite grey walls, cyan/celeste accents matching the logo.
 */
export default function ImmersiveRoom() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [frameGlow, setFrameGlow] = useState(0);

  useEffect(() => {
    let max = 1;
    const calc = () => {
      max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    calc();
    const onScroll = () => {
      const progress = window.scrollY / max;
      setScrollProgress(progress);
      // Glow frames when in services section (roughly 15-45% of page)
      const servicesProximity = 1 - Math.min(1, Math.abs(progress - 0.3) * 4);
      setFrameGlow(Math.max(0, servicesProximity));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
    };
  }, []);

  const walkZ = scrollProgress * 3000;
  const swayX = Math.sin(scrollProgress * 4) * 2;

  const cyan = "hsl(200 80% 74%)";
  const cyanGlow = "hsl(200 80% 74% / 0.15)";
  const cyanFrame = "hsl(200 70% 60% / 0.5)";
  const cyanFrameGlow = "hsl(200 70% 60% / 0.1)";
  const cyanBaseboard = "hsl(200 80% 74% / 0.25)";

  const texRepeat = "repeat";

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <div
        style={{
          perspective: "800px",
          perspectiveOrigin: `${50 + swayX * 0.3}% 45%`,
          width: "100%",
          height: "100%",
        }}
      >
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
              backgroundImage: `url(${textureFloor})`,
              backgroundSize: "512px 512px",
              backgroundRepeat: texRepeat,
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
              background: `linear-gradient(180deg, transparent, ${cyanBaseboard}, transparent)`,
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
              backgroundImage: `url(${textureCeiling})`,
              backgroundSize: "512px 512px",
              backgroundRepeat: texRepeat,
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
              background: `linear-gradient(180deg, hsl(200 80% 74% / 0.6), hsl(200 80% 74% / 0.2), hsl(200 80% 74% / 0.6))`,
              transform: "rotateX(-90deg) translateZ(-50vh)",
              transformOrigin: "center bottom",
              bottom: "50%",
              left: "50%",
              marginLeft: "-1.5px",
              boxShadow: `0 0 20px 8px ${cyanGlow}`,
            }}
          />

          {/* ── LEFT WALL ── */}
          <div
            style={{
              position: "absolute",
              width: "4000px",
              height: "100vh",
              backgroundImage: `url(${textureWall})`,
              backgroundSize: "512px 512px",
              backgroundRepeat: texRepeat,
              transform: "rotateY(90deg) translateZ(-50vw)",
              transformOrigin: "left center",
              top: "0",
              left: "0",
            }}
          >
            {/* Wall panels with cyan frames */}
            {Array.from({ length: 12 }).map((_, i) => {
              const frameCyanBorder = `hsl(200 70% 60% / ${0.5 + frameGlow * 0.4})`;
              const frameCyanGlowVal = `hsl(200 70% 60% / ${0.1 + frameGlow * 0.25})`;
              return (
                <div
                  key={`l-${i}`}
                  style={{
                    position: "absolute",
                    left: `${i * 320 + 60}px`,
                    top: "20%",
                    width: "200px",
                    height: "55%",
                    backgroundImage: `url(${textureWall})`,
                    backgroundSize: "256px 256px",
                    backgroundRepeat: texRepeat,
                    filter: "brightness(0.7)",
                    border: `2px solid ${frameCyanBorder}`,
                    boxShadow: `inset 0 0 30px rgba(0,0,0,0.5), 0 0 ${15 + frameGlow * 30}px ${frameCyanGlowVal}`,
                    transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                  }}
                />
              );
            })}

            {/* Cyan baseboard */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "3px",
                background: `linear-gradient(90deg, transparent, ${cyanBaseboard}, transparent)`,
              }}
            />
          </div>

          {/* ── RIGHT WALL ── */}
          <div
            style={{
              position: "absolute",
              width: "4000px",
              height: "100vh",
              backgroundImage: `url(${textureWall})`,
              backgroundSize: "512px 512px",
              backgroundRepeat: texRepeat,
              transform: "rotateY(-90deg) translateZ(-50vw)",
              transformOrigin: "right center",
              top: "0",
              right: "0",
            }}
          >
            {/* Wall panels with cyan frames */}
            {Array.from({ length: 12 }).map((_, i) => {
              const frameCyanBorder = `hsl(200 70% 60% / ${0.5 + frameGlow * 0.4})`;
              const frameCyanGlowVal = `hsl(200 70% 60% / ${0.1 + frameGlow * 0.25})`;
              return (
                <div
                  key={`r-${i}`}
                  style={{
                    position: "absolute",
                    right: `${i * 320 + 60}px`,
                    top: "20%",
                    width: "200px",
                    height: "55%",
                    backgroundImage: `url(${textureWall})`,
                    backgroundSize: "256px 256px",
                    backgroundRepeat: texRepeat,
                    filter: "brightness(0.7)",
                    border: `2px solid ${frameCyanBorder}`,
                    boxShadow: `inset 0 0 30px rgba(0,0,0,0.5), 0 0 ${15 + frameGlow * 30}px ${frameCyanGlowVal}`,
                    transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                  }}
                />
              );
            })}

            {/* Cyan baseboard */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "100%",
                height: "3px",
                background: `linear-gradient(90deg, transparent, ${cyanBaseboard}, transparent)`,
              }}
            />
          </div>

          {/* ── END WALL ── */}
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              backgroundImage: `url(${textureWall})`,
              backgroundSize: "512px 512px",
              backgroundRepeat: texRepeat,
              transform: "translateZ(-3800px)",
              top: "0",
              left: "0",
            }}
          >
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
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 8% / 0.5) 100%)",
        }}
      />
    </div>
  );
}
