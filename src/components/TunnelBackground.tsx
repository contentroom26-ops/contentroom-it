import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LEN = 70;
const W = 5;
const H = 4;
const HW = W / 2;
const EYE = 1.6;
const BAYS = 14;
const BD = LEN / BAYS;

function Tunnel({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollRef.current;
    camera.position.x = Math.sin(p * 2) * 0.03;
    camera.position.y = EYE;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 1 - p * LEN * 0.9, 0.06);
  });

  return (
    <group>
      {/* Ambient */}
      <ambientLight intensity={0.15} color="#a0c8e8" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.25} metalness={0.7} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#121212" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#121212" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* End wall */}
      <mesh position={[0, H / 2, -LEN]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>

      {/* Bay details + lights */}
      {Array.from({ length: BAYS }).map((_, i) => {
        const z = -i * BD;
        const zm = z - BD / 2;

        return (
          <group key={i}>
            {/* ── Cyan ceiling light strip ── */}
            <mesh position={[0, H - 0.005, zm]}>
              <boxGeometry args={[0.12, 0.01, BD * 0.8]} />
              <meshBasicMaterial color="#7dd3fc" />
            </mesh>
            {/* Glow around strip */}
            <mesh position={[0, H - 0.01, zm]}>
              <boxGeometry args={[0.6, 0.005, BD * 0.8]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh position={[0, H - 0.015, zm]}>
              <boxGeometry args={[1.8, 0.005, BD * 0.8]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* Actual light */}
            <pointLight position={[0, H - 0.1, zm]} color="#7dd3fc" intensity={1.5} distance={8} decay={2} />

            {/* ── Pilasters ── */}
            <mesh position={[-HW + 0.09, H / 2, z]}>
              <boxGeometry args={[0.18, H, 0.2]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.25} />
            </mesh>
            <mesh position={[HW - 0.09, H / 2, z]}>
              <boxGeometry args={[0.18, H, 0.2]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.25} />
            </mesh>

            {/* ── Ceiling beam ── */}
            <mesh position={[0, H - 0.1, z]}>
              <boxGeometry args={[W, 0.2, 0.12]} />
              <meshStandardMaterial color="#151515" roughness={0.7} metalness={0.2} />
            </mesh>

            {/* ── Baseboards ── */}
            <mesh position={[-HW + 0.03, 0.06, zm]}>
              <boxGeometry args={[0.06, 0.12, BD * 0.9]} />
              <meshStandardMaterial color="#1e1e1e" roughness={0.5} metalness={0.3} />
            </mesh>
            <mesh position={[HW - 0.03, 0.06, zm]}>
              <boxGeometry args={[0.06, 0.12, BD * 0.9]} />
              <meshStandardMaterial color="#1e1e1e" roughness={0.5} metalness={0.3} />
            </mesh>

            {/* ── Wall panel (dark recess) ── */}
            <mesh position={[-HW + 0.005, H * 0.48, zm]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[BD * 0.7, H * 0.5]} />
              <meshStandardMaterial color="#0c0c0c" roughness={0.95} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[HW - 0.005, H * 0.48, zm]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[BD * 0.7, H * 0.5]} />
              <meshStandardMaterial color="#0c0c0c" roughness={0.95} side={THREE.DoubleSide} />
            </mesh>

            {/* ── Gold frame around panel ── */}
            {/* Top */}
            <mesh position={[-HW + 0.015, H * 0.73, zm]}>
              <boxGeometry args={[0.03, 0.02, BD * 0.7]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[HW - 0.015, H * 0.73, zm]}>
              <boxGeometry args={[0.03, 0.02, BD * 0.7]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Bottom */}
            <mesh position={[-HW + 0.015, H * 0.23, zm]}>
              <boxGeometry args={[0.03, 0.02, BD * 0.7]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[HW - 0.015, H * 0.23, zm]}>
              <boxGeometry args={[0.03, 0.02, BD * 0.7]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Verticals */}
            <mesh position={[-HW + 0.015, H * 0.48, zm - BD * 0.35]}>
              <boxGeometry args={[0.03, H * 0.5, 0.02]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[-HW + 0.015, H * 0.48, zm + BD * 0.35]}>
              <boxGeometry args={[0.03, H * 0.5, 0.02]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[HW - 0.015, H * 0.48, zm - BD * 0.35]}>
              <boxGeometry args={[0.03, H * 0.5, 0.02]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[HW - 0.015, H * 0.48, zm + BD * 0.35]}>
              <boxGeometry args={[0.03, H * 0.5, 0.02]} />
              <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
            </mesh>

            {/* ── Frame spotlights ── */}
            <spotLight position={[-HW + 0.5, H - 0.2, zm]} angle={0.5} penumbra={0.8} intensity={0.5} color="#e8c675" distance={4} decay={2} />
            <spotLight position={[HW - 0.5, H - 0.2, zm]} angle={0.5} penumbra={0.8} intensity={0.5} color="#e8c675" distance={4} decay={2} />

            {/* ── Floor cyan glow strips ── */}
            <mesh position={[-HW + 0.01, 0.003, zm]}>
              <boxGeometry args={[0.02, 0.006, BD * 0.9]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.1} />
            </mesh>
            <mesh position={[HW - 0.01, 0.003, zm]}>
              <boxGeometry args={[0.02, 0.006, BD * 0.9]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.1} />
            </mesh>
          </group>
        );
      })}

      {/* End glow */}
      <pointLight position={[0, H * 0.5, -LEN + 1]} color="#7dd3fc" intensity={2} distance={35} decay={1.5} />
    </group>
  );
}

export default function TunnelBackground() {
  const scrollRef = useRef(0);
  const maxRef = useRef(1);

  useEffect(() => {
    const calc = () => {
      maxRef.current = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    calc();
    const onScroll = () => { scrollRef.current = window.scrollY / maxRef.current; };
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
        camera={{ fov: 65, near: 0.1, far: 100, position: [0, EYE, 1] }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
        onCreated={({ gl }) => gl.setClearColor("#050508")}
      >
        <fog attach="fog" args={["#050508", 4, 40]} />
        <Tunnel scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
