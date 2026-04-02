import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LEN = 80;
const W = 5;
const H = 4;
const HW = W / 2;
const EYE = 1.6;
const BAYS = 16;
const BAY_D = LEN / BAYS;

/* ── Corridor geometry ── */
function Corridor({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollRef.current;
    camera.position.set(
      Math.sin(p * 2) * 0.03,
      EYE,
      THREE.MathUtils.lerp(camera.position.z, 1 - p * LEN * 0.92, 0.06)
    );
  });

  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.08} color="#b0d4f1" />

      {/* Central ceiling light strip — cool blue/cyan */}
      {Array.from({ length: BAYS }).map((_, i) => {
        const z = -i * BAY_D - BAY_D / 2;
        return (
          <group key={`light-${i}`}>
            {/* Cyan ceiling strip light */}
            <mesh position={[0, H - 0.01, z]}>
              <boxGeometry args={[0.15, 0.02, BAY_D * 0.85]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.9} />
            </mesh>
            {/* Glow halo around strip */}
            <mesh position={[0, H - 0.02, z]}>
              <boxGeometry args={[0.8, 0.01, BAY_D * 0.85]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* Wide glow */}
            <mesh position={[0, H - 0.03, z]}>
              <boxGeometry args={[2, 0.01, BAY_D * 0.85]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* Actual light source */}
            <rectAreaLight
              width={0.3}
              height={BAY_D * 0.7}
              intensity={3}
              color="#7dd3fc"
              position={[0, H - 0.05, z]}
              rotation={[Math.PI / 2, 0, 0]}
            />
          </group>
        );
      })}

      {/* ── Floor ── dark polished */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.25} metalness={0.7} />
      </mesh>
      {/* Floor reflection hint */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.001, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.15} metalness={0.85} transparent opacity={0.4} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh rotation-x={Math.PI / 2} position={[0, H, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh rotation-y={Math.PI / 2} position={[-HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh rotation-y={-Math.PI / 2} position={[HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* ── End wall ── */}
      <mesh position={[0, H / 2, -LEN]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#080808" roughness={0.9} emissive="#7dd3fc" emissiveIntensity={0.015} />
      </mesh>

      {/* ── Architectural details per bay ── */}
      {Array.from({ length: BAYS }).map((_, i) => {
        const z = -i * BAY_D;
        const zMid = z - BAY_D / 2;

        return (
          <group key={`bay-${i}`}>
            {/* Pilasters */}
            {[-1, 1].map((s) => (
              <mesh key={`p${s}`} position={[s * (HW - 0.09), H / 2, z]}>
                <boxGeometry args={[0.18, H, 0.2]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.25} />
              </mesh>
            ))}

            {/* Ceiling beam */}
            <mesh position={[0, H - 0.1, z]}>
              <boxGeometry args={[W + 0.05, 0.2, 0.12]} />
              <meshStandardMaterial color="#151515" roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Baseboards */}
            {[-1, 1].map((s) => (
              <mesh key={`b${s}`} position={[s * (HW - 0.03), 0.06, zMid]}>
                <boxGeometry args={[0.06, 0.12, BAY_D * 0.92]} />
                <meshStandardMaterial color="#1e1e1e" roughness={0.5} metalness={0.3} />
              </mesh>
            ))}

            {/* Wall panels — placeholder for future portfolio frames */}
            {[-1, 1].map((s) => (
              <group key={`frame-${s}`}>
                {/* Panel background (dark recess) */}
                <mesh position={[s * (HW - 0.008), H * 0.48, zMid]} rotation-y={s * -Math.PI / 2}>
                  <planeGeometry args={[BAY_D * 0.72, H * 0.5]} />
                  <meshStandardMaterial color="#0c0c0c" roughness={0.95} side={THREE.DoubleSide} />
                </mesh>
                {/* Frame border — thin gold outline */}
                {/* Top */}
                <mesh position={[s * (HW - 0.015), H * 0.73, zMid]}>
                  <boxGeometry args={[0.03, 0.02, BAY_D * 0.72]} />
                  <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
                </mesh>
                {/* Bottom */}
                <mesh position={[s * (HW - 0.015), H * 0.23, zMid]}>
                  <boxGeometry args={[0.03, 0.02, BAY_D * 0.72]} />
                  <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
                </mesh>
                {/* Left vertical */}
                <mesh position={[s * (HW - 0.015), H * 0.48, zMid - BAY_D * 0.36]}>
                  <boxGeometry args={[0.03, H * 0.5, 0.02]} />
                  <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
                </mesh>
                {/* Right vertical */}
                <mesh position={[s * (HW - 0.015), H * 0.48, zMid + BAY_D * 0.36]}>
                  <boxGeometry args={[0.03, H * 0.5, 0.02]} />
                  <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
                </mesh>

                {/* Small spotlight illuminating the frame */}
                <spotLight
                  position={[s * (HW - 0.4), H - 0.15, zMid]}
                  target-position={[s * HW, H * 0.48, zMid]}
                  angle={0.5}
                  penumbra={0.8}
                  intensity={0.4}
                  color="#e8c675"
                  distance={4}
                  decay={2}
                />
              </group>
            ))}

            {/* Floor light strip under each wall — subtle cyan reflection */}
            {[-1, 1].map((s) => (
              <mesh key={`fl${s}`} position={[s * (HW - 0.01), 0.003, zMid]}>
                <boxGeometry args={[0.03, 0.006, BAY_D * 0.9]} />
                <meshBasicMaterial color="#7dd3fc" transparent opacity={0.08} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Central ceiling light strip — continuous gold accent */}
      <mesh position={[0, H - 0.005, -LEN / 2]}>
        <boxGeometry args={[0.08, 0.01, LEN]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.4} />
      </mesh>

      {/* Floor center line */}
      <mesh position={[0, 0.002, -LEN / 2]}>
        <boxGeometry args={[0.02, 0.004, LEN]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>

      {/* End glow */}
      <pointLight position={[0, H * 0.6, -LEN + 1]} color="#7dd3fc" intensity={1.5} distance={30} decay={1.5} />
    </>
  );
}

/* ── Mount ── */
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
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}>
      <Canvas
        camera={{ fov: 65, near: 0.1, far: 120, position: [0, EYE, 1] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        onCreated={({ gl }) => gl.setClearColor("#050508")}
      >
        <fog attach="fog" args={["#050508", 3, 35]} />
        <Corridor scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
