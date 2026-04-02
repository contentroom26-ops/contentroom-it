import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import WallServices from "./WallServices";
import WallPortfolio from "./WallPortfolio";
import WallAbout from "./WallAbout";
import WallContact from "./WallContact";
import textureWall from "@/assets/texture-wall.jpg";
import textureFloor from "@/assets/texture-floor.jpg";

const WALL_COUNT = 4;
const PLATEAU_RATIO = 0.65;
const DEPTH = 150; // px — half-cube depth, small for less distortion
const PERSPECTIVE = 1000; // px

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getRotationState(p: number) {
  const wallSize = 1 / WALL_COUNT;
  for (let i = 0; i < WALL_COUNT; i++) {
    const wallStart = i * wallSize;
    const wallEnd = wallStart + wallSize;
    const plateauEnd = wallStart + wallSize * PLATEAU_RATIO;
    if (p <= wallEnd || i === WALL_COUNT - 1) {
      if (p <= plateauEnd) {
        const wallProgress = (p - wallStart) / (wallSize * PLATEAU_RATIO);
        return { rotation: i * 90, activeWall: i, wallProgress: Math.min(1, wallProgress) };
      } else {
        const t = Math.min(1, (p - plateauEnd) / (wallEnd - plateauEnd));
        const eased = easeInOutCubic(t);
        return { rotation: i * 90 + eased * 90, activeWall: i, wallProgress: 1 };
      }
    }
  }
  return { rotation: 270, activeWall: 3, wallProgress: 1 };
}

export default function RoomExperience() {
  const [progress, setProgress] = useState(0);
  const [activeWall, setActiveWall] = useState(0);
  const [wallProgress, setWallProgress] = useState(0);
  const rotateY = useMotionValue(0);
  const smoothRotate = useSpring(rotateY, { stiffness: 70, damping: 28, mass: 0.7 });

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setProgress(p);
      const state = getRotationState(p);
      rotateY.set(-state.rotation);
      setActiveWall(state.activeWall);
      setWallProgress(state.wallProgress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rotateY]);

  // Scale factor to compensate perspective shrinking:
  // At Z = -DEPTH, apparent scale = PERSPECTIVE / (PERSPECTIVE + DEPTH)
  const scale = PERSPECTIVE / (PERSPECTIVE + DEPTH);
  // We make walls wider/taller to fill viewport after shrinking
  const wallW = 100 / scale; // vw
  const wallH = 100 / scale; // vh
  const offsetX = -(wallW - 100) / 2; // vw offset to center
  const offsetY = -(wallH - 100) / 2; // vh offset to center

  const wallBase: React.CSSProperties = {
    position: "absolute",
    width: `${wallW}vw`,
    height: `${wallH}vh`,
    left: `${offsetX}vw`,
    top: `${offsetY}vh`,
    overflow: "hidden",
  };

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: "50% 50%" }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 2% / 0.7) 100%)" }}
      />

      {/* Room cube */}
      <motion.div
        style={{
          rotateY: smoothRotate,
          transformStyle: "preserve-3d",
          position: "absolute",
          inset: 0,
        }}
      >
        {/* ── FLOOR ── */}
        <div
          style={{
            position: "absolute",
            width: "300vw",
            height: "300vw",
            left: "-100vw",
            top: "50%",
            transform: `rotateX(90deg) translateZ(${DEPTH}px)`,
            transformOrigin: "center top",
            backgroundImage: `url(${textureFloor})`,
            backgroundSize: "250px 250px",
            backgroundRepeat: "repeat",
            opacity: 0.45,
          }}
        />

        {/* ── CEILING ── */}
        <div
          style={{
            position: "absolute",
            width: "300vw",
            height: "300vw",
            left: "-100vw",
            bottom: "50%",
            transform: `rotateX(-90deg) translateZ(${DEPTH}px)`,
            transformOrigin: "center bottom",
            backgroundImage: `url(${textureFloor})`,
            backgroundSize: "250px 250px",
            backgroundRepeat: "repeat",
            opacity: 0.15,
            filter: "brightness(0.3)",
          }}
        />

        {/* ── WALL 0: FRONT → Servizi ── */}
        <div style={{ ...wallBase, transform: `translateZ(-${DEPTH}px)` }}>
          <WallBg active={activeWall === 0} />
          <WallContent>
            <WallServices isActive={activeWall === 0} progress={activeWall === 0 ? wallProgress : 0} />
          </WallContent>
        </div>

        {/* ── WALL 1: RIGHT → Portfolio ── */}
        <div style={{ ...wallBase, transform: `rotateY(-90deg) translateZ(-${DEPTH}px)` }}>
          <WallBg active={activeWall === 1} />
          <WallContent>
            <WallPortfolio isActive={activeWall === 1} progress={activeWall === 1 ? wallProgress : 0} />
          </WallContent>
        </div>

        {/* ── WALL 2: BACK → Chi Siamo ── */}
        <div style={{ ...wallBase, transform: `rotateY(180deg) translateZ(-${DEPTH}px)` }}>
          <WallBg active={activeWall === 2} />
          <WallContent>
            <WallAbout isActive={activeWall === 2} progress={activeWall === 2 ? wallProgress : 0} />
          </WallContent>
        </div>

        {/* ── WALL 3: LEFT → Contatti ── */}
        <div style={{ ...wallBase, transform: `rotateY(90deg) translateZ(-${DEPTH}px)` }}>
          <WallBg active={activeWall === 3} />
          <WallContent>
            <WallContact isActive={activeWall === 3} progress={activeWall === 3 ? wallProgress : 0} />
          </WallContent>
        </div>
      </motion.div>

      {/* Nav indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {["Servizi", "Portfolio", "Chi siamo", "Contatti"].map((label, i) => (
          <button
            key={label}
            onClick={() => {
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
              const wallSize = 1 / WALL_COUNT;
              const target = i * wallSize + (wallSize * PLATEAU_RATIO) / 2;
              window.scrollTo({ top: target * maxScroll, behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className="text-[9px] font-body tracking-[0.2em] uppercase transition-all duration-500"
              style={{ color: activeWall === i ? "hsl(200 80% 74%)" : "hsl(0 0% 35%)" }}
            >
              {label}
            </span>
            <div
              className="h-0.5 rounded-full transition-all duration-500"
              style={{
                width: activeWall === i ? 24 : 6,
                background: activeWall === i ? "hsl(200 80% 74%)" : "hsl(0 0% 20%)",
                boxShadow: activeWall === i ? "0 0 8px hsl(200 80% 74% / 0.4)" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      {activeWall === 0 && progress < 0.04 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground/40 text-[9px] tracking-[0.3em] uppercase font-body">
            Scorri per esplorare
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-4 h-7 rounded-full border border-muted-foreground/20 flex justify-center pt-1.5"
          >
            <motion.div
              animate={{ height: ["3px", "8px", "3px"], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-0.5 rounded-full bg-primary/50"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/** Centers content within the oversized wall panel */
function WallContent({ children }: { children: React.ReactNode }) {
  const scale = PERSPECTIVE / (PERSPECTIVE + DEPTH);
  // Content area = 100vw × 100vh centered in the oversized wall
  const insetX = ((100 / scale) - 100) / 2;
  const insetY = ((100 / scale) - 100) / 2;
  return (
    <div
      className="absolute"
      style={{
        left: `${insetX}vw`,
        top: `${insetY}vh`,
        width: "100vw",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
}

function WallBg({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${textureWall})`,
          backgroundSize: "512px 512px",
          backgroundRepeat: "repeat",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, hsl(0 0% 0% / 0.5) 0%, transparent 8%, transparent 92%, hsl(0 0% 0% / 0.5) 100%),
            linear-gradient(to bottom, hsl(0 0% 0% / 0.35) 0%, transparent 10%, transparent 90%, hsl(0 0% 0% / 0.4) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at center 50%, hsl(200 80% 74% / 0.03), transparent 60%)",
          opacity: active ? 1 : 0,
        }}
      />
    </div>
  );
}
