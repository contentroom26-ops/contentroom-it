import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import WallServices from "./WallServices";
import WallPortfolio from "./WallPortfolio";
import WallAbout from "./WallAbout";
import WallContact from "./WallContact";
import textureWall from "@/assets/texture-wall.jpg";
import textureFloor from "@/assets/texture-floor.jpg";

const WALL_COUNT = 4;
const SCROLL_HEIGHT = 500; // vh per wall

// Each wall: 70% plateau (facing wall), 30% transition (rotating)
const PLATEAU_RATIO = 0.70;
const TRANSITION_RATIO = 1 - PLATEAU_RATIO;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Maps linear scroll progress (0→1) to rotation with plateaus.
 * Each wall section: [plateau where rotation is locked] → [smooth transition to next wall]
 * Returns { rotation, activeWall, wallProgress }
 */
function getRotationState(p: number) {
  const wallSize = 1 / WALL_COUNT; // 0.25

  for (let i = 0; i < WALL_COUNT; i++) {
    const wallStart = i * wallSize;
    const wallEnd = wallStart + wallSize;
    const plateauEnd = wallStart + wallSize * PLATEAU_RATIO;

    if (p <= wallEnd || i === WALL_COUNT - 1) {
      if (p <= plateauEnd) {
        // In plateau — locked to this wall's angle
        const wallProgress = (p - wallStart) / (wallSize * PLATEAU_RATIO);
        return { rotation: i * 90, activeWall: i, wallProgress: Math.min(1, wallProgress) };
      } else {
        // In transition zone to next wall
        const transStart = plateauEnd;
        const transEnd = wallEnd;
        const t = Math.min(1, (p - transStart) / (transEnd - transStart));
        const eased = easeInOutCubic(t);
        const rotation = i * 90 + eased * 90;
        // During transition, keep active wall as current
        return { rotation, activeWall: i, wallProgress: 1 };
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
  const smoothRotate = useSpring(rotateY, { stiffness: 80, damping: 30, mass: 0.6 });

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

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}>
      {/* Ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 3% / 0.6) 100%)",
        }}
      />

      {/* Room container - rotates with scroll */}
      <motion.div
        style={{
          rotateY: smoothRotate,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* ── FLOOR ── */}
        <div
          style={{
            position: "absolute",
            width: "200vw",
            height: "200vw",
            left: "-50vw",
            top: "50%",
            backgroundImage: `url(${textureFloor})`,
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
            transform: "rotateX(90deg) translateZ(50vh)",
            transformOrigin: "center center",
            opacity: 0.7,
          }}
        />

        {/* ── CEILING ── */}
        <div
          style={{
            position: "absolute",
            width: "200vw",
            height: "200vw",
            left: "-50vw",
            bottom: "50%",
            backgroundImage: `url(${textureFloor})`,
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
            transform: "rotateX(-90deg) translateZ(50vh)",
            transformOrigin: "center center",
            opacity: 0.3,
            filter: "brightness(0.4)",
          }}
        />

        {/* Ceiling light */}
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "200vw",
            left: "50%",
            bottom: "50%",
            marginLeft: "-2px",
            background: "linear-gradient(180deg, hsl(200 80% 74% / 0.3), hsl(200 80% 74% / 0.1))",
            transform: "rotateX(-90deg) translateZ(50vh)",
            transformOrigin: "center center",
            boxShadow: "0 0 30px 10px hsl(200 80% 74% / 0.08)",
          }}
        />

        {/* ── WALL 1 (Front - Servizi) ── */}
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            transform: "translateZ(-50vw)",
            transformStyle: "preserve-3d",
          }}
        >
          <WallBackground />
          <WallServices isActive={activeWall === 0} progress={activeWall === 0 ? wallProgress : 0} />
        </div>

        {/* ── WALL 2 (Right - Portfolio) ── */}
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            transform: "rotateY(90deg) translateZ(-50vw)",
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
          }}
        >
          <WallBackground />
          <WallPortfolio isActive={activeWall === 1} progress={activeWall === 1 ? wallProgress : 0} />
        </div>

        {/* ── WALL 3 (Back - Chi Siamo) ── */}
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            transform: "rotateY(180deg) translateZ(-50vw)",
            transformStyle: "preserve-3d",
          }}
        >
          <WallBackground />
          <WallAbout isActive={activeWall === 2} progress={activeWall === 2 ? wallProgress : 0} />
        </div>

        {/* ── WALL 4 (Left - Contatti) ── */}
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            transform: "rotateY(270deg) translateZ(-50vw)",
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
        >
          <WallBackground />
          <WallContact isActive={activeWall === 3} progress={activeWall === 3 ? wallProgress : 0} />
        </div>
      </motion.div>

      {/* Wall indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {["Servizi", "Portfolio", "Chi siamo", "Contatti"].map((label, i) => (
          <button
            key={label}
            onClick={() => {
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
              const target = (i / WALL_COUNT) * maxScroll + maxScroll / (WALL_COUNT * 2);
              window.scrollTo({ top: target, behavior: "smooth" });
            }}
            className="group flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] font-body tracking-[0.2em] uppercase transition-all duration-500"
              style={{
                color: activeWall === i ? "hsl(200 80% 74%)" : "hsl(0 0% 40%)",
                opacity: activeWall === i ? 1 : 0.6,
              }}
            >
              {label}
            </span>
            <div
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: activeWall === i ? 32 : 8,
                background: activeWall === i ? "hsl(200 80% 74%)" : "hsl(0 0% 25%)",
                boxShadow: activeWall === i ? "0 0 12px hsl(200 80% 74% / 0.4)" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      {activeWall === 0 && progress < 0.05 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground/50 text-[10px] tracking-[0.3em] uppercase font-body">
            Scorri per esplorare
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-muted-foreground/20 flex justify-center pt-2"
          >
            <motion.div
              animate={{ height: ["4px", "10px", "4px"], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-0.5 rounded-full bg-primary/60"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function WallBackground() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${textureWall})`,
        backgroundSize: "512px 512px",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Subtle ambient occlusion at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, hsl(0 0% 0% / 0.4) 0%, transparent 15%, transparent 85%, hsl(0 0% 0% / 0.4) 100%),
            linear-gradient(to bottom, hsl(0 0% 0% / 0.3) 0%, transparent 20%, transparent 80%, hsl(0 0% 0% / 0.4) 100%)
          `,
        }}
      />
    </div>
  );
}
