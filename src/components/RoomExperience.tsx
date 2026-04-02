import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WallServices from "./WallServices";
import WallPortfolio from "./WallPortfolio";
import WallAbout from "./WallAbout";
import WallContact from "./WallContact";
import textureWall from "@/assets/texture-wall.jpg";
import textureFloor from "@/assets/texture-floor.jpg";

const WALL_COUNT = 4;
const PLATEAU_RATIO = 0.65;

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
        return { rotation: 0, activeWall: i, wallProgress: Math.min(1, wallProgress), transitioning: false, transitionT: 0 };
      } else {
        const t = Math.min(1, (p - plateauEnd) / (wallEnd - plateauEnd));
        const eased = easeInOutCubic(t);
        return { rotation: eased * 90, activeWall: i, wallProgress: 1, transitioning: true, transitionT: eased };
      }
    }
  }
  return { rotation: 0, activeWall: 3, wallProgress: 1, transitioning: false, transitionT: 0 };
}

const walls = [
  { key: "servizi", Component: WallServices },
  { key: "portfolio", Component: WallPortfolio },
  { key: "chi-siamo", Component: WallAbout },
  { key: "contatti", Component: WallContact },
];

export default function RoomExperience() {
  const [progress, setProgress] = useState(0);
  const [activeWall, setActiveWall] = useState(0);
  const [wallProgress, setWallProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionT, setTransitionT] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setProgress(p);
      const state = getRotationState(p);
      setActiveWall(state.activeWall);
      setWallProgress(state.wallProgress);
      setRotation(state.rotation);
      setTransitioning(state.transitioning);
      setTransitionT(state.transitionT);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextWall = Math.min(WALL_COUNT - 1, activeWall + 1);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}>
      {/* Room ambient — floor/ceiling edges */}
      <div className="absolute inset-0" style={{ background: "hsl(0 0% 5%)" }} />
      
      {/* Floor */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          height: "18vh",
          backgroundImage: `url(${textureFloor})`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      {/* Ceiling */}
      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: "12vh",
          backgroundImage: `url(${textureFloor})`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
          opacity: 0.2,
          filter: "brightness(0.4)",
        }}
      />

      {/* Wall texture background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${textureWall})`,
          backgroundSize: "512px 512px",
          backgroundRepeat: "repeat",
          opacity: 0.6,
        }}
      />

      {/* Edge shadows for room depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.6)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 2% / 0.5) 100%)" }}
      />

      {/* Active wall content */}
      <div
        className="absolute inset-0"
        style={{
          transform: transitioning
            ? `perspective(1200px) rotateY(-${rotation}deg)`
            : "none",
          transformOrigin: "center center",
          transition: "none",
        }}
      >
        {walls.map((wall, i) => {
          const { Component } = wall;
          const isActive = activeWall === i;
          const isNext = transitioning && nextWall === i;
          const show = isActive || isNext;

          if (!show) return null;

          return (
            <div
              key={wall.key}
              className="absolute inset-0"
              style={{
                opacity: isActive ? (transitioning ? 1 - transitionT : 1) : transitionT,
                pointerEvents: isActive && !transitioning ? "auto" : "none",
              }}
            >
              <Component isActive={true} progress={isActive ? wallProgress : 0} />
            </div>
          );
        })}
      </div>

      {/* Side walls hint (perspective lines) */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none"
        style={{
          width: "8vw",
          background: "linear-gradient(to right, hsl(0 0% 0% / 0.5), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none"
        style={{
          width: "8vw",
          background: "linear-gradient(to left, hsl(0 0% 0% / 0.5), transparent)",
        }}
      />

      {/* Nav indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-5">
        {["Servizi", "Portfolio", "Chi siamo", "Contatti"].map((label, i) => (
          <button
            key={label}
            onClick={() => {
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
              const wallSize = 1 / WALL_COUNT;
              window.scrollTo({ top: (i * wallSize + wallSize * PLATEAU_RATIO / 2) * maxScroll, behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className="text-[9px] font-body tracking-[0.2em] uppercase transition-all duration-500"
              style={{ color: activeWall === i ? "hsl(200 80% 74%)" : "hsl(0 0% 35%)" }}
            >{label}</span>
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground/40 text-[9px] tracking-[0.3em] uppercase font-body">Scorri per esplorare</span>
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
