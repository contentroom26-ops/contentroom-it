import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import WallServices from "./WallServices";
import WallPortfolio from "./WallPortfolio";
import WallAbout from "./WallAbout";
import WallContact from "./WallContact";
import textureWall from "@/assets/texture-wall.jpg";
import textureFloor from "@/assets/texture-floor.jpg";

const WALL_COUNT = 4;

// Plateau: camera stays facing the wall. Transition: camera rotates to next wall.
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

// Half-size of the cube in CSS units
const HALF = "50vmin";

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

  const wallStyle = (rotY: number): React.CSSProperties => ({
    position: "absolute",
    width: "100vmin",
    height: "100vmin",
    left: "50%",
    top: "50%",
    marginLeft: "-50vmin",
    marginTop: "-50vmin",
    transform: `rotateY(${rotY}deg) translateZ(50vmin)`,
    backfaceVisibility: "hidden",
    overflow: "hidden",
  });

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 2% / 0.7) 100%)",
        }}
      />

      {/* Room cube — rotates around Y axis */}
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
            width: "100vmin",
            height: "100vmin",
            left: "50%",
            top: "50%",
            marginLeft: "-50vmin",
            marginTop: "-50vmin",
            transform: "rotateX(90deg) translateZ(50vmin)",
            backgroundImage: `url(${textureFloor})`,
            backgroundSize: "300px 300px",
            backgroundRepeat: "repeat",
            opacity: 0.6,
          }}
        />

        {/* ── CEILING ── */}
        <div
          style={{
            position: "absolute",
            width: "100vmin",
            height: "100vmin",
            left: "50%",
            top: "50%",
            marginLeft: "-50vmin",
            marginTop: "-50vmin",
            transform: "rotateX(-90deg) translateZ(50vmin)",
            backgroundImage: `url(${textureFloor})`,
            backgroundSize: "300px 300px",
            backgroundRepeat: "repeat",
            opacity: 0.25,
            filter: "brightness(0.3)",
          }}
        />

        {/* Ceiling light strip */}
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "100vmin",
            left: "50%",
            top: "50%",
            marginLeft: "-1px",
            marginTop: "-50vmin",
            transform: "rotateX(-90deg) translateZ(50vmin)",
            background: "linear-gradient(180deg, hsl(200 80% 74% / 0.4), hsl(200 80% 74% / 0.1), hsl(200 80% 74% / 0.4))",
            boxShadow: "0 0 20px 8px hsl(200 80% 74% / 0.06)",
          }}
        />

        {/* ── WALL 1: FRONT → Servizi (rotateY 0°) ── */}
        <div style={wallStyle(0)}>
          <WallBg active={activeWall === 0} />
          <WallServices isActive={activeWall === 0} progress={activeWall === 0 ? wallProgress : 0} />
        </div>

        {/* ── WALL 2: RIGHT → Portfolio (rotateY 90°) ── */}
        <div style={wallStyle(90)}>
          <WallBg active={activeWall === 1} />
          <WallPortfolio isActive={activeWall === 1} progress={activeWall === 1 ? wallProgress : 0} />
        </div>

        {/* ── WALL 3: BACK → Chi Siamo (rotateY 180°) ── */}
        <div style={wallStyle(180)}>
          <WallBg active={activeWall === 2} />
          <WallAbout isActive={activeWall === 2} progress={activeWall === 2 ? wallProgress : 0} />
        </div>

        {/* ── WALL 4: LEFT → Contatti (rotateY -90° / 270°) ── */}
        <div style={wallStyle(-90)}>
          <WallBg active={activeWall === 3} />
          <WallContact isActive={activeWall === 3} progress={activeWall === 3 ? wallProgress : 0} />
        </div>
      </motion.div>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {["Servizi", "Portfolio", "Chi siamo", "Contatti"].map((label, i) => (
          <button
            key={label}
            onClick={() => {
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
              const wallSize = 1 / WALL_COUNT;
              const target = i * wallSize + (wallSize * PLATEAU_RATIO) / 2;
              window.scrollTo({ top: target * maxScroll, behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] font-body tracking-[0.2em] uppercase transition-all duration-500"
              style={{
                color: activeWall === i ? "hsl(200 80% 74%)" : "hsl(0 0% 40%)",
              }}
            >
              {label}
            </span>
            <div
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: activeWall === i ? 28 : 6,
                background: activeWall === i ? "hsl(200 80% 74%)" : "hsl(0 0% 20%)",
                boxShadow: activeWall === i ? "0 0 10px hsl(200 80% 74% / 0.4)" : "none",
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
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground/40 text-[10px] tracking-[0.3em] uppercase font-body">
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
              className="w-0.5 rounded-full bg-primary/50"
            />
          </motion.div>
        </motion.div>
      )}
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
      {/* Edge shadows for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, hsl(0 0% 0% / 0.5) 0%, transparent 12%, transparent 88%, hsl(0 0% 0% / 0.5) 100%),
            linear-gradient(to bottom, hsl(0 0% 0% / 0.35) 0%, transparent 15%, transparent 85%, hsl(0 0% 0% / 0.45) 100%)
          `,
        }}
      />
      {/* Active wall glow */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at center 60%, hsl(200 80% 74% / 0.04), transparent 70%)",
          opacity: active ? 1 : 0,
        }}
      />
    </div>
  );
}
