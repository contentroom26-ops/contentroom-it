import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LEN = 60;
const W = 4.5;
const H = 3.5;
const HW = W / 2;
const EYE = 1.55;

function Room({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollRef.current;
    camera.position.set(
      Math.sin(p * 2.5) * 0.04,
      EYE,
      THREE.MathUtils.lerp(camera.position.z, -p * LEN * 0.9, 0.06)
    );
  });

  const bays = 12;
  const bayDepth = LEN / bays;

  return (
    <>
      {/* === LIGHTING === */}
      <ambientLight intensity={0.25} color="#f5e6c8" />

      {/* Floor - dark polished concrete */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, H, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#111111" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Left wall */}
      <mesh rotation-y={Math.PI / 2} position={[-HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#161616" roughness={0.75} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh rotation-y={-Math.PI / 2} position={[HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#161616" roughness={0.75} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* End wall */}
      <mesh position={[0, H / 2, -LEN]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} emissive="#d4a843" emissiveIntensity={0.02} />
      </mesh>

      {/* === BAYS === */}
      {Array.from({ length: bays }).map((_, i) => {
        const z = -i * bayDepth;
        const zMid = z - bayDepth / 2;

        return (
          <group key={i}>
            {/* Pilasters (left + right) */}
            {[-1, 1].map((s) => (
              <mesh key={`p${s}`} position={[s * (HW - 0.08), H / 2, z]}>
                <boxGeometry args={[0.16, H, 0.3]} />
                <meshStandardMaterial color="#1f1f1f" roughness={0.55} metalness={0.3} />
              </mesh>
            ))}

            {/* Ceiling beam */}
            <mesh position={[0, H - 0.12, z]}>
              <boxGeometry args={[W + 0.1, 0.24, 0.18]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.65} metalness={0.2} />
            </mesh>

            {/* Baseboards */}
            {[-1, 1].map((s) => (
              <mesh key={`b${s}`} position={[s * (HW - 0.03), 0.07, zMid]}>
                <boxGeometry args={[0.06, 0.14, bayDepth * 0.9]} />
                <meshStandardMaterial color="#222222" roughness={0.45} metalness={0.35} />
              </mesh>
            ))}

            {/* Crown moulding */}
            {[-1, 1].map((s) => (
              <mesh key={`c${s}`} position={[s * (HW - 0.03), H - 0.05, zMid]}>
                <boxGeometry args={[0.06, 0.1, bayDepth * 0.9]} />
                <meshStandardMaterial color="#222222" roughness={0.45} metalness={0.35} />
              </mesh>
            ))}

            {/* Recessed wall panels */}
            {[-1, 1].map((s) => (
              <mesh key={`wp${s}`} position={[s * (HW - 0.01), H * 0.47, zMid]} rotation-y={s * -Math.PI / 2}>
                <planeGeometry args={[bayDepth * 0.7, H * 0.5]} />
                <meshStandardMaterial color="#0f0f0f" roughness={0.92} metalness={0.05} side={THREE.DoubleSide} />
              </mesh>
            ))}

            {/* Panel frame rails */}
            {[-1, 1].map((s) => (
              <group key={`fr${s}`}>
                <mesh position={[s * (HW - 0.04), H * 0.72, zMid]}>
                  <boxGeometry args={[0.04, 0.025, bayDepth * 0.7]} />
                  <meshStandardMaterial color="#252525" roughness={0.5} metalness={0.35} />
                </mesh>
                <mesh position={[s * (HW - 0.04), H * 0.22, zMid]}>
                  <boxGeometry args={[0.04, 0.025, bayDepth * 0.7]} />
                  <meshStandardMaterial color="#252525" roughness={0.5} metalness={0.35} />
                </mesh>
              </group>
            ))}

            {/* Gold floor edge strips */}
            {[-1, 1].map((s) => (
              <mesh key={`g${s}`} position={[s * (HW - 0.005), 0.004, zMid]}>
                <boxGeometry args={[0.012, 0.008, bayDepth]} />
                <meshBasicMaterial color="#d4a843" transparent opacity={0.3} />
              </mesh>
            ))}

            {/* Ceiling spot light every 2 bays */}
            {i % 2 === 0 && (
              <group>
                <spotLight
                  position={[0, H - 0.2, zMid]}
                  angle={0.8}
                  penumbra={0.7}
                  intensity={1.2}
                  color="#e8c675"
                  distance={12}
                  decay={1.5}
                />
                {/* Light fixture */}
                <mesh position={[0, H - 0.03, zMid]}>
                  <cylinderGeometry args={[0.1, 0.12, 0.04, 8]} />
                  <meshStandardMaterial color="#2a2720" roughness={0.4} metalness={0.6} />
                </mesh>
                {/* Glow disc */}
                <mesh position={[0, H - 0.06, zMid]} rotation-x={Math.PI / 2}>
                  <circleGeometry args={[0.1, 8]} />
                  <meshBasicMaterial color="#d4a843" transparent opacity={0.6} />
                </mesh>
              </group>
            )}

            {/* Floor tile lines - lateral */}
            <mesh position={[0, 0.002, z]}>
              <boxGeometry args={[W, 0.004, 0.015]} />
              <meshBasicMaterial color="#2a2a2a" />
            </mesh>
          </group>
        );
      })}

      {/* Floor tile lines - longitudinal */}
      {[-1, 0, 1].map((x) => (
        <mesh key={`fl${x}`} position={[x * 1.2, 0.002, -LEN / 2]}>
          <boxGeometry args={[0.015, 0.004, LEN]} />
          <meshBasicMaterial color="#2a2a2a" />
        </mesh>
      ))}

      {/* End glow */}
      <pointLight position={[0, H / 2, -LEN + 1]} color="#d4a843" intensity={2} distance={35} decay={1.5} />
    </>
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
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}>
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, EYE, 0] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        onCreated={({ gl }) => gl.setClearColor("#080808")}
      >
        <fog attach="fog" args={["#080808", 5, 40]} />
        <Room scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
