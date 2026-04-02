import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Room dimensions ── */
const W = 6;        // width
const H = 3.6;      // height
const DEPTH = 50;   // how deep the room goes
const HW = W / 2;
const EYE = 1.55;   // camera eye height

/* ── Showroom Room Scene ── */
function Room({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  /* Materials (reuse for perf) */
  const mats = useMemo(() => ({
    floor: new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.15, metalness: 0.8 }),
    ceiling: new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.95 }),
    wall: new THREE.MeshStandardMaterial({ color: "#141414", roughness: 0.85, metalness: 0.05, side: THREE.DoubleSide }),
    pillar: new THREE.MeshStandardMaterial({ color: "#1c1c1c", roughness: 0.5, metalness: 0.3 }),
    trim: new THREE.MeshStandardMaterial({ color: "#c9a84c", roughness: 0.25, metalness: 0.8 }),
    panel: new THREE.MeshStandardMaterial({ color: "#0c0c0c", roughness: 0.95, side: THREE.DoubleSide }),
    lightStrip: new THREE.MeshBasicMaterial({ color: "#7dd3fc" }),
    lightGlow: new THREE.MeshBasicMaterial({ color: "#7dd3fc", transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false }),
    floorStrip: new THREE.MeshBasicMaterial({ color: "#c9a84c", transparent: true, opacity: 0.08 }),
  }), []);

  /* Camera walk */
  useFrame(() => {
    const p = scrollRef.current;
    const targetZ = 1.5 - p * DEPTH * 0.88;
    camera.position.x = Math.sin(p * 3) * 0.02;
    camera.position.y = EYE + Math.sin(p * 6) * 0.01;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
  });

  /* Bay count */
  const BAYS = 10;
  const BD = DEPTH / BAYS;

  return (
    <group>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.25} color="#b0d4e8" />

      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -DEPTH / 2]} material={mats.floor}>
        <planeGeometry args={[W, DEPTH]} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, -DEPTH / 2]} material={mats.ceiling}>
        <planeGeometry args={[W, DEPTH]} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HW, H / 2, -DEPTH / 2]} material={mats.wall}>
        <planeGeometry args={[DEPTH, H]} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HW, H / 2, -DEPTH / 2]} material={mats.wall}>
        <planeGeometry args={[DEPTH, H]} />
      </mesh>

      {/* ── End wall ── */}
      <mesh position={[0, H / 2, -DEPTH]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>

      {/* ── Bays: structural + lighting ── */}
      {Array.from({ length: BAYS }).map((_, i) => {
        const z = -i * BD;
        const zm = z - BD / 2;
        return (
          <group key={i}>
            {/* Central ceiling light strip */}
            <mesh position={[0, H - 0.005, zm]} material={mats.lightStrip}>
              <boxGeometry args={[0.1, 0.008, BD * 0.75]} />
            </mesh>
            {/* Glow halo 1 */}
            <mesh position={[0, H - 0.01, zm]} material={mats.lightGlow}>
              <boxGeometry args={[0.5, 0.004, BD * 0.75]} />
            </mesh>
            {/* Glow halo 2 */}
            <mesh position={[0, H - 0.015, zm]}>
              <boxGeometry args={[1.5, 0.004, BD * 0.75]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* Point light */}
            <pointLight position={[0, H - 0.1, zm]} color="#7dd3fc" intensity={1.2} distance={7} decay={2} />

            {/* ── Pilasters ── */}
            <mesh position={[-HW + 0.08, H / 2, z]} material={mats.pillar}>
              <boxGeometry args={[0.16, H, 0.18]} />
            </mesh>
            <mesh position={[HW - 0.08, H / 2, z]} material={mats.pillar}>
              <boxGeometry args={[0.16, H, 0.18]} />
            </mesh>

            {/* ── Ceiling beam ── */}
            <mesh position={[0, H - 0.08, z]} material={mats.pillar}>
              <boxGeometry args={[W, 0.16, 0.1]} />
            </mesh>

            {/* ── Baseboards ── */}
            <mesh position={[-HW + 0.025, 0.05, zm]} material={mats.pillar}>
              <boxGeometry args={[0.05, 0.1, BD * 0.85]} />
            </mesh>
            <mesh position={[HW - 0.025, 0.05, zm]} material={mats.pillar}>
              <boxGeometry args={[0.05, 0.1, BD * 0.85]} />
            </mesh>

            {/* ── Wall panels (recessed dark) ── */}
            <mesh position={[-HW + 0.003, H * 0.48, zm]} rotation={[0, Math.PI / 2, 0]} material={mats.panel}>
              <planeGeometry args={[BD * 0.65, H * 0.5]} />
            </mesh>
            <mesh position={[HW - 0.003, H * 0.48, zm]} rotation={[0, -Math.PI / 2, 0]} material={mats.panel}>
              <planeGeometry args={[BD * 0.65, H * 0.5]} />
            </mesh>

            {/* ── Gold frames around panels ── */}
            {/* Top bar */}
            <mesh position={[-HW + 0.012, H * 0.73, zm]} material={mats.trim}>
              <boxGeometry args={[0.025, 0.018, BD * 0.65]} />
            </mesh>
            <mesh position={[HW - 0.012, H * 0.73, zm]} material={mats.trim}>
              <boxGeometry args={[0.025, 0.018, BD * 0.65]} />
            </mesh>
            {/* Bottom bar */}
            <mesh position={[-HW + 0.012, H * 0.23, zm]} material={mats.trim}>
              <boxGeometry args={[0.025, 0.018, BD * 0.65]} />
            </mesh>
            <mesh position={[HW - 0.012, H * 0.23, zm]} material={mats.trim}>
              <boxGeometry args={[0.025, 0.018, BD * 0.65]} />
            </mesh>
            {/* Vertical bars */}
            {[-1, 1].map((side) =>
              [-1, 1].map((vDir) => (
                <mesh
                  key={`v-${side}-${vDir}`}
                  position={[side * (HW - 0.012), H * 0.48, zm + vDir * BD * 0.325]}
                  material={mats.trim}
                >
                  <boxGeometry args={[0.025, H * 0.5, 0.018]} />
                </mesh>
              ))
            )}

            {/* ── Spot lights on frames ── */}
            <spotLight position={[-HW + 0.5, H - 0.15, zm]} angle={0.5} penumbra={0.8} intensity={0.4} color="#e8c675" distance={3.5} decay={2} />
            <spotLight position={[HW - 0.5, H - 0.15, zm]} angle={0.5} penumbra={0.8} intensity={0.4} color="#e8c675" distance={3.5} decay={2} />

            {/* ── Gold floor strips ── */}
            <mesh position={[-HW + 0.008, 0.002, zm]} material={mats.floorStrip}>
              <boxGeometry args={[0.015, 0.004, BD * 0.85]} />
            </mesh>
            <mesh position={[HW - 0.008, 0.002, zm]} material={mats.floorStrip}>
              <boxGeometry args={[0.015, 0.004, BD * 0.85]} />
            </mesh>
          </group>
        );
      })}

      {/* ── End-of-corridor glow ── */}
      <pointLight position={[0, H * 0.5, -DEPTH + 2]} color="#7dd3fc" intensity={2.5} distance={30} decay={1.5} />
    </group>
  );
}

/* ── Main component ── */
export default function RoomBackground() {
  const scrollRef = useRef(0);
  const maxRef = useRef(1);

  useEffect(() => {
    const calc = () => {
      maxRef.current = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    calc();
    const onScroll = () => {
      scrollRef.current = window.scrollY / maxRef.current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    const obs = new MutationObserver(calc);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ fov: 68, near: 0.1, far: 80, position: [0, EYE, 1.5] }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.6 }}
        onCreated={({ gl }) => gl.setClearColor("#050508")}
      >
        <fog attach="fog" args={["#050508", 5, 45]} />
        <Room scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
