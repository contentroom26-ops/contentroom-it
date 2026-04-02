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
  const [depth, setDepth] = useState(300);
  const rotateY = useMotionValue(0);
  const smoothRotate = useSpring(rotateY, { stiffness: 70, damping: 28, mass: 0.7 });

  // Compute depth based on viewport width so the room feels proportioned
  useEffect(() => {
    const updateDepth = () => setDepth(Math.round(window.innerWidth * 0.35));
    updateDepth();
    window.addEventListener("resize", updateDepth);
    return () => window.removeEventListener("resize", updateDepth);
  }, []);

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

  const D = depth;
  const perspVal = D * 3; // 3× depth → minimal distortion, nice 3D

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        perspective: `${perspVal}px`,
        perspectiveOrigin: "50% 50%",
        background: "hsl(0 0% 5%)",
      }}
    >
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 2% / 0.6) 100%)" }}
      />

      {/* Rotating room */}
      <motion.div
        style={{
          rotateY: smoothRotate,
          transformStyle: "preserve-3d",
          position: "absolute",
          inset: 0,
        }}
      >
        {/* FLOOR */}
        <div style={{
          position: "absolute",
          width: "400vw", height: "400vw",
          left: "-150vw", top: "50%",
          transform: `rotateX(90deg) translateZ(${D}px)`,
          transformOrigin: "center top",
          backgroundImage: `url(${textureFloor})`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          opacity: 0.35,
        }} />

        {/* CEILING */}
        <div style={{
          position: "absolute",
          width: "400vw", height: "400vw",
          left: "-150vw", bottom: "50%",
          transform: `rotateX(-90deg) translateZ(${D}px)`,
          transformOrigin: "center bottom",
          backgroundImage: `url(${textureFloor})`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          opacity: 0.12,
          filter: "brightness(0.3)",
        }} />

        {/* 4 WALLS — each wall is 100vw×100vh, pushed out by D */}
        {/* Wall 0: FRONT (Servizi) — at Z = -D */}
        <Wall transform={`translateZ(-${D}px)`} active={activeWall === 0}>
          <WallServices isActive={activeWall === 0} progress={activeWall === 0 ? wallProgress : 0} />
        </Wall>

        {/* Wall 1: RIGHT (Portfolio) — rotateY(-90) pushes to X = +D */}
        <Wall transform={`rotateY(-90deg) translateZ(-${D}px)`} active={activeWall === 1}>
          <WallPortfolio isActive={activeWall === 1} progress={activeWall === 1 ? wallProgress : 0} />
        </Wall>

        {/* Wall 2: BACK (Chi siamo) — rotateY(180) pushes to Z = +D */}
        <Wall transform={`rotateY(180deg) translateZ(-${D}px)`} active={activeWall === 2}>
          <WallAbout isActive={activeWall === 2} progress={activeWall === 2 ? wallProgress : 0} />
        </Wall>

        {/* Wall 3: LEFT (Contatti) — rotateY(90) pushes to X = -D */}
        <Wall transform={`rotateY(90deg) translateZ(-${D}px)`} active={activeWall === 3}>
          <WallContact isActive={activeWall === 3} progress={activeWall === 3 ? wallProgress : 0} />
        </Wall>
      </motion.div>

      {/* Nav */}
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

function Wall({ transform, active, children }: { transform: string; active: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        transform,
        overflow: "hidden",
      }}
    >
      {/* Texture background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${textureWall})`,
          backgroundSize: "512px 512px",
          backgroundRepeat: "repeat",
          zIndex: 0,
        }}
      />
      {/* Edge shadows */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to right, hsl(0 0% 0% / 0.45) 0%, transparent 8%, transparent 92%, hsl(0 0% 0% / 0.45) 100%),
            linear-gradient(to bottom, hsl(0 0% 0% / 0.3) 0%, transparent 10%, transparent 90%, hsl(0 0% 0% / 0.35) 100%)
          `,
        }}
      />
      {/* Active wall glow */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          zIndex: 2,
          background: "radial-gradient(ellipse at center 50%, hsl(200 80% 74% / 0.04), transparent 60%)",
          opacity: active ? 1 : 0,
        }}
      />
      {/* Content */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        {children}
      </div>
    </div>
  );
}
