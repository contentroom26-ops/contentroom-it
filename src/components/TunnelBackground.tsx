import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LEN = 80;
const W = 4;
const H = 3.2;
const HW = W / 2;
const EYE = 1.5;

function Room({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollRef.current;
    camera.position.set(
      Math.sin(p * 3) * 0.05,
      EYE,
      THREE.MathUtils.lerp(camera.position.z, -p * LEN * 0.85, 0.08)
    );
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, H - 0.3, -2]} intensity={0.8} color="#e8c675" distance={15} />
      <pointLight position={[0, H - 0.3, -LEN * 0.3]} intensity={0.6} color="#e8c675" distance={20} />
      <pointLight position={[0, H - 0.3, -LEN * 0.6]} intensity={0.6} color="#e8c675" distance={20} />
      <pointLight position={[0, H - 0.3, -LEN + 2]} intensity={1.5} color="#d4a843" distance={30} />

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -LEN / 2]} receiveShadow>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, H, -LEN / 2]}>
        <planeGeometry args={[W, LEN]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh rotation-y={Math.PI / 2} position={[-HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#141414" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh rotation-y={-Math.PI / 2} position={[HW, H / 2, -LEN / 2]}>
        <planeGeometry args={[LEN, H]} />
        <meshStandardMaterial color="#141414" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* End wall */}
      <mesh position={[0, H / 2, -LEN]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Architectural details per bay */}
      {Array.from({ length: 16 }).map((_, i) => {
        const z = -i * 5;
        return (
          <group key={i}>
            {/* Left pilaster */}
            <mesh position={[-HW + 0.07, H / 2, z]}>
              <boxGeometry args={[0.14, H, 0.25]} />
              <meshStandardMaterial color="#1c1c1c" roughness={0.6} metalness={0.25} />
            </mesh>
            {/* Right pilaster */}
            <mesh position={[HW - 0.07, H / 2, z]}>
              <boxGeometry args={[0.14, H, 0.25]} />
              <meshStandardMaterial color="#1c1c1c" roughness={0.6} metalness={0.25} />
            </mesh>
            {/* Ceiling beam */}
            <mesh position={[0, H - 0.1, z]}>
              <boxGeometry args={[W, 0.2, 0.15]} />
              <meshStandardMaterial color="#181818" roughness={0.7} metalness={0.2} />
            </mesh>
            {/* Baseboard left */}
            <mesh position={[-HW + 0.03, 0.06, z - 2.5]}>
              <boxGeometry args={[0.06, 0.12, 5]} />
              <meshStandardMaterial color="#1e1e1e" roughness={0.5} metalness={0.3} />
            </mesh>
            {/* Baseboard right */}
            <mesh position={[HW - 0.03, 0.06, z - 2.5]}>
              <boxGeometry args={[0.06, 0.12, 5]} />
              <meshStandardMaterial color="#1e1e1e" roughness={0.5} metalness={0.3} />
            </mesh>
            {/* Gold floor strip left */}
            <mesh position={[-HW + 0.005, 0.003, z - 2.5]}>
              <boxGeometry args={[0.01, 0.006, 5]} />
              <meshBasicMaterial color="#d4a843" />
            </mesh>
            {/* Gold floor strip right */}
            <mesh position={[HW - 0.005, 0.003, z - 2.5]}>
              <boxGeometry args={[0.01, 0.006, 5]} />
              <meshBasicMaterial color="#d4a843" />
            </mesh>
            {/* Ceiling light fixture every 2 bays */}
            {i % 2 === 0 && (
              <>
                <spotLight
                  position={[0, H - 0.15, z - 2.5]}
                  angle={0.7}
                  penumbra={0.8}
                  intensity={0.5}
                  color="#e8c675"
                  distance={8}
                />
                <mesh position={[0, H - 0.03, z - 2.5]}>
                  <cylinderGeometry args={[0.08, 0.1, 0.04, 8]} />
                  <meshBasicMaterial color="#d4a843" transparent opacity={0.5} />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </>
  );
}

export default function TunnelBackground() {
  const scrollRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getMax = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    let max = getMax();

    const onScroll = () => {
      scrollRef.current = window.scrollY / max;
    };
    const onResize = () => {
      max = getMax();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    setReady(true);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!ready) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, width: "100%", height: "100vh" }}>
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 120, position: [0, EYE, 0] }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.8 }}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#050505");
        }}
      >
        <fog attach="fog" args={["#050505", 1, 25]} />
        <Room scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
