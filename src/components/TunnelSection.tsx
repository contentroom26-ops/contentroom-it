import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const TUNNEL_SEGMENTS = 40;
const TUNNEL_LENGTH = 80;
const TUNNEL_RADIUS = 3;

function TunnelGeometry({ progress }: { progress: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Create octagonal tunnel segments
  const segments = useMemo(() => {
    const segs: { position: number; rotation: number }[] = [];
    for (let i = 0; i < TUNNEL_SEGMENTS; i++) {
      segs.push({
        position: -(i / TUNNEL_SEGMENTS) * TUNNEL_LENGTH,
        rotation: (i * Math.PI) / 60,
      });
    }
    return segs;
  }, []);

  // Edge glow lines along the tunnel
  const edgeLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    const sides = 8;
    for (let s = 0; s < sides; s++) {
      const angle = (s / sides) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < TUNNEL_SEGMENTS; i++) {
        const z = -(i / TUNNEL_SEGMENTS) * TUNNEL_LENGTH;
        const r = TUNNEL_RADIUS + Math.sin(i * 0.3) * 0.15;
        points.push(
          new THREE.Vector3(
            Math.cos(angle + (i * Math.PI) / 60) * r,
            Math.sin(angle + (i * Math.PI) / 60) * r,
            z
          )
        );
      }
      lines.push(points);
    }
    return lines;
  }, []);

  useFrame(() => {
    const p = progress.current;
    // Move camera forward through the tunnel
    camera.position.z = 2 - p * TUNNEL_LENGTH * 0.85;
    camera.rotation.z = Math.sin(p * Math.PI * 2) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Ambient fog feel */}
      <fog attach="fog" args={["#0a0a0a", 5, 35]} />

      {/* Minimal lighting */}
      <ambientLight intensity={0.08} color="#d4a843" />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#d4a843" distance={15} />

      {/* Tunnel ring segments */}
      {segments.map((seg, i) => (
        <mesh
          key={i}
          position={[0, 0, seg.position]}
          rotation={[0, 0, seg.rotation]}
        >
          <ringGeometry args={[TUNNEL_RADIUS - 0.02, TUNNEL_RADIUS + 0.02, 8]} />
          <meshBasicMaterial
            color="#d4a843"
            transparent
            opacity={0.08 + (i % 4 === 0 ? 0.12 : 0)}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Edge glow lines */}
      {edgeLines.map((points, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              count={points.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#d4a843" transparent opacity={0.06} />
        </line>
      ))}

      {/* Occasional cross-beams for depth */}
      {segments
        .filter((_, i) => i % 5 === 0)
        .map((seg, i) => (
          <group key={`cross-${i}`} position={[0, 0, seg.position]} rotation={[0, 0, seg.rotation]}>
            {[0, 1, 2, 3].map((j) => {
              const angle = (j / 4) * Math.PI * 2 + Math.PI / 8;
              return (
                <mesh
                  key={j}
                  position={[Math.cos(angle) * TUNNEL_RADIUS * 0.5, Math.sin(angle) * TUNNEL_RADIUS * 0.5, 0]}
                  rotation={[0, 0, angle]}
                >
                  <boxGeometry args={[TUNNEL_RADIUS, 0.015, 0.015]} />
                  <meshBasicMaterial color="#d4a843" transparent opacity={0.05} />
                </mesh>
              );
            })}
          </group>
        ))}

      {/* Moving light that follows camera */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#d4a843" distance={20} />
    </group>
  );
}

const TunnelSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.25, 0.4], ["30px", "0px"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Three.js Canvas */}
        <Canvas
          camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, 2] }}
          style={{ background: "hsl(0 0% 5%)" }}
          gl={{ antialias: true, alpha: false }}
        >
          <TunnelGeometry progress={progressRef} />
        </Canvas>

        {/* Gradient blends */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 5% / 0.7) 100%)",
          }}
        />

        {/* Text overlay */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="text-center px-6">
            <p className="text-primary font-body text-xs tracking-[0.4em] uppercase mb-4">
              Portfolio
            </p>
            <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-foreground">
              La nostra galleria.
            </h2>
            <p className="text-muted-foreground/70 font-body text-sm md:text-base mt-4 max-w-md mx-auto">
              Scorri per esplorare i nostri lavori
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TunnelSection;
