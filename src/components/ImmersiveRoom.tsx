import { useEffect, useState } from "react";
import { Aperture, Share2, Rocket, Code2 } from "lucide-react";
import textureWall from "@/assets/texture-wall.jpg";
import textureFloor from "@/assets/texture-floor.jpg";
import textureCeiling from "@/assets/texture-ceiling.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const CYAN = "hsl(200 80% 74%)";

const serviceFrames = [
  { icon: Aperture, num: "01", title: "Content\nCreation" },
  { icon: Share2, num: "02", title: "Social Media\nMgmt" },
  { icon: Rocket, num: "03", title: "Growth &\nMarketing" },
  { icon: Code2, num: "04", title: "Siti &\nDigital" },
];

const portfolioFrames = [
  { img: portfolio1, name: "Luxe Fashion" },
  { img: portfolio2, name: "Gusto Ristorante" },
  { img: portfolio3, name: "FitPro Academy" },
  { img: portfolio4, name: "Glow Skincare" },
];

export default function ImmersiveRoom() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeService, setActiveService] = useState(-1);
  const [activePortfolio, setActivePortfolio] = useState(-1);

  useEffect(() => {
    let max = 1;
    const calc = () => {
      max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    calc();

    const onScroll = () => setScrollProgress(window.scrollY / max);

    const onServiceChange = (e: Event) =>
      setActiveService((e as CustomEvent).detail as number);
    const onPortfolioChange = (e: Event) =>
      setActivePortfolio((e as CustomEvent).detail as number);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    window.addEventListener("serviceActiveChange", onServiceChange);
    window.addEventListener("portfolioActiveChange", onPortfolioChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
      window.removeEventListener("serviceActiveChange", onServiceChange);
      window.removeEventListener("portfolioActiveChange", onPortfolioChange);
    };
  }, []);

  const walkZ = scrollProgress * 3000;
  const swayX = Math.sin(scrollProgress * 4) * 2;

  const cyanFrame = "hsl(200 70% 60% / 0.5)";
  const cyanFrameGlow = "hsl(200 70% 60% / 0.1)";
  const cyanGlow = "hsl(200 80% 74% / 0.15)";
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

          {/* Floor reflection */}
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

          {/* ── LEFT WALL — Service frames ── */}
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
            {Array.from({ length: 12 }).map((_, i) => {
              const isService = i < 4;
              const isActive = isService && activeService === i;
              const isNearby = isService && activeService >= 0 && Math.abs(activeService - i) <= 1;
              const glowLevel = isActive ? 1 : isNearby ? 0.4 : 0;

              return (
                <div
                  key={`l-${i}`}
                  style={{
                    position: "absolute",
                    left: `${i * 320 + 60}px`,
                    top: "20%",
                    width: "200px",
                    height: "55%",
                    backgroundImage: isActive
                      ? `linear-gradient(135deg, hsl(200 80% 74% / 0.08), hsl(200 60% 40% / 0.15))`
                      : `url(${textureWall})`,
                    backgroundSize: isActive ? undefined : "256px 256px",
                    backgroundRepeat: texRepeat,
                    filter: isActive ? "brightness(1)" : "brightness(0.7)",
                    border: `2px solid ${
                      isActive ? "hsl(200 80% 74% / 0.9)" : isNearby ? "hsl(200 70% 60% / 0.6)" : cyanFrame
                    }`,
                    boxShadow: `inset 0 0 30px rgba(0,0,0,0.5), 0 0 ${15 + glowLevel * 50}px ${
                      isActive ? "hsl(200 80% 74% / 0.4)" : isNearby ? "hsl(200 70% 60% / 0.2)" : cyanFrameGlow
                    }`,
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {isService && (() => {
                    const svc = serviceFrames[i];
                    const Icon = svc.icon;
                    return (
                      <>
                        <span
                          style={{
                            position: "absolute",
                            fontSize: "80px",
                            fontWeight: 900,
                            lineHeight: 1,
                            color: isActive ? "hsl(200 80% 74% / 0.15)" : "hsl(200 80% 74% / 0.05)",
                            transition: "color 0.6s ease",
                          }}
                        >
                          {svc.num}
                        </span>
                        <div
                          style={{
                            position: "relative",
                            zIndex: 2,
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            background: isActive ? "hsl(200 80% 74% / 0.15)" : "hsl(200 80% 74% / 0.05)",
                            border: `1px solid hsl(200 80% 74% / ${isActive ? 0.4 : 0.1})`,
                            transition: "all 0.6s ease",
                            transform: isActive ? "scale(1.15)" : "scale(1)",
                          }}
                        >
                          <Icon
                            size={20}
                            strokeWidth={1.5}
                            style={{ color: isActive ? CYAN : "hsl(200 80% 74% / 0.4)", transition: "color 0.5s ease" }}
                          />
                        </div>
                        <span
                          style={{
                            position: "relative",
                            zIndex: 2,
                            marginTop: 8,
                            fontSize: 11,
                            fontWeight: 700,
                            textAlign: "center",
                            lineHeight: 1.2,
                            whiteSpace: "pre-line",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: isActive ? CYAN : "hsl(200 80% 74% / 0.3)",
                            transition: "color 0.5s ease",
                          }}
                        >
                          {svc.title}
                        </span>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: 3,
                            width: isActive ? "100%" : "0%",
                            background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                            transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                      </>
                    );
                  })()}
                </div>
              );
            })}

            <div
              style={{
                position: "absolute", bottom: "0", left: "0",
                width: "100%", height: "3px",
                background: `linear-gradient(90deg, transparent, ${cyanBaseboard}, transparent)`,
              }}
            />
          </div>

          {/* ── RIGHT WALL — Portfolio frames ── */}
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
            {Array.from({ length: 12 }).map((_, i) => {
              const isPortfolio = i < 4;
              const isActive = isPortfolio && activePortfolio === i;
              const isNearby = isPortfolio && activePortfolio >= 0 && Math.abs(activePortfolio - i) <= 1;
              const glowLevel = isActive ? 1 : isNearby ? 0.4 : 0;

              return (
                <div
                  key={`r-${i}`}
                  style={{
                    position: "absolute",
                    right: `${i * 320 + 60}px`,
                    top: "20%",
                    width: "200px",
                    height: "55%",
                    backgroundImage: isPortfolio
                      ? `url(${portfolioFrames[i].img})`
                      : `url(${textureWall})`,
                    backgroundSize: isPortfolio ? "cover" : "256px 256px",
                    backgroundPosition: isPortfolio ? "center" : undefined,
                    backgroundRepeat: texRepeat,
                    filter: isActive ? "brightness(1) saturate(1.2)" : isPortfolio ? "brightness(0.35) saturate(0.3)" : "brightness(0.7)",
                    border: `2px solid ${
                      isActive ? "hsl(200 80% 74% / 0.9)" : isNearby ? "hsl(200 70% 60% / 0.6)" : cyanFrame
                    }`,
                    boxShadow: `inset 0 0 ${isPortfolio ? 15 : 30}px rgba(0,0,0,${isActive ? 0.2 : 0.5}), 0 0 ${15 + glowLevel * 50}px ${
                      isActive ? "hsl(200 80% 74% / 0.4)" : isNearby ? "hsl(200 70% 60% / 0.2)" : cyanFrameGlow
                    }`,
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  {/* Portfolio label overlay */}
                  {isPortfolio && (
                    <div
                      style={{
                        width: "100%",
                        padding: "12px 8px 8px",
                        background: isActive
                          ? "linear-gradient(transparent, hsl(0 0% 0% / 0.7))"
                          : "linear-gradient(transparent, hsl(0 0% 0% / 0.4))",
                        transition: "background 0.5s ease",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: 10,
                          fontWeight: 700,
                          textAlign: "center",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: isActive ? CYAN : "hsl(200 80% 74% / 0.4)",
                          transition: "color 0.5s ease",
                        }}
                      >
                        {portfolioFrames[i].name}
                      </span>
                    </div>
                  )}

                  {/* Active indicator */}
                  {isPortfolio && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: 3,
                        width: isActive ? "100%" : "0%",
                        background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                        transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  )}
                </div>
              );
            })}

            <div
              style={{
                position: "absolute", bottom: "0", right: "0",
                width: "100%", height: "3px",
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
