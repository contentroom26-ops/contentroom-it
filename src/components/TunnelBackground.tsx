import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LENGTH = 100;
const WIDTH = 5;
const HEIGHT = 4;
const HALF_W = WIDTH / 2;
const EYE_H = 1.6;
const BAY = 5;
const BAYS = Math.floor(LENGTH / BAY);

/* ── Floor Tiles ── */
function Floor() {
  const geo = useMemo(() => new THREE.PlaneGeometry(WIDTH, LENGTH, 1, 1), []);
  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -LENGTH / 2]} geometry={geo}>
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Tile grid lines — longitudinal */}
      {[-HALF_W + 0.5, -0.5, 0.5, HALF_W - 0.5].map((x, i) => (
        <mesh key={`fl-${i}`} position={[x, 0.002, -LENGTH / 2]}>
          <boxGeometry args={[0.015, 0.004, LENGTH]} />
          <meshBasicMaterial color="#222222" />
        </mesh>
      ))}
      {/* Tile grid lines — lateral */}
      {Array.from({ length: BAYS + 1 }).map((_, i) => (
        <mesh key={`ft-${i}`} position={[0, 0.002, -i * BAY]}>
          <boxGeometry args={[WIDTH, 0.004, 0.015]} />
          <meshBasicMaterial color="#222222" />
        </mesh>
      ))}
    </group>
  );
}

/* ── Ceiling ── */
function Ceiling() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, HEIGHT, -LENGTH / 2]}>
        <planeGeometry args={[WIDTH, LENGTH]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0.0} />
      </mesh>
      {/* Ceiling beams */}
      {Array.from({ length: BAYS + 1 }).map((_, i) => (
        <mesh key={`cb-${i}`} position={[0, HEIGHT - 0.1, -i * BAY]}>
          <boxGeometry args={[WIDTH + 0.2, 0.2, 0.15]} />
          <meshStandardMaterial color="#151515" roughness={0.8} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Walls with Panels ── */
function Walls() {
  return (
    <group>
      {/* Left wall base */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HALF_W, HEIGHT / 2, -LENGTH / 2]}>
        <planeGeometry args={[LENGTH, HEIGHT]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Right wall base */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HALF_W, HEIGHT / 2, -LENGTH / 2]}>
        <planeGeometry args={[LENGTH, HEIGHT]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Wall panels & pilasters per bay */}
      {Array.from({ length: BAYS }).map((_, i) => {
        const z = -i * BAY - BAY / 2;
        return (
          <group key={`wp-${i}`}>
            {/* Left pilaster front */}
            <mesh position={[-HALF_W + 0.08, HEIGHT / 2, -i * BAY]}>
              <boxGeometry args={[0.16, HEIGHT, 0.25]} />
              <meshStandardMaterial color="#181818" roughness={0.6} metalness={0.25} />
            </mesh>
            {/* Right pilaster front */}
            <mesh position={[HALF_W - 0.08, HEIGHT / 2, -i * BAY]}>
              <boxGeometry args={[0.16, HEIGHT, 0.25]} />
              <meshStandardMaterial color="#181818" roughness={0.6} metalness={0.25} />
            </mesh>

            {/* Left recessed panel */}
            <mesh position={[-HALF_W + 0.02, HEIGHT * 0.45, z]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[BAY * 0.75, HEIGHT * 0.55]} />
              <meshStandardMaterial color="#0b0b0b" roughness={0.92} metalness={0.05} side={THREE.DoubleSide} />
            </mesh>
            {/* Right recessed panel */}
            <mesh position={[HALF_W - 0.02, HEIGHT * 0.45, z]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[BAY * 0.75, HEIGHT * 0.55]} />
              <meshStandardMaterial color="#0b0b0b" roughness={0.92} metalness={0.05} side={THREE.DoubleSide} />
            </mesh>

            {/* Baseboard left */}
            <mesh position={[-HALF_W + 0.04, 0.08, z]}>
              <boxGeometry args={[0.08, 0.16, BAY * 0.8]} />
              <meshStandardMaterial color="#1c1c1c" roughness={0.5} metalness={0.3} />
            </mesh>
            {/* Baseboard right */}
            <mesh position={[HALF_W - 0.04, 0.08, z]}>
              <boxGeometry args={[0.08, 0.16, BAY * 0.8]} />
              <meshStandardMaterial color="#1c1c1c" roughness={0.5} metalness={0.3} />
            </mesh>

            {/* Crown molding left */}
            <mesh position={[-HALF_W + 0.04, HEIGHT - 0.06, z]}>
              <boxGeometry args={[0.08, 0.12, BAY * 0.8]} />
              <meshStandardMaterial color="#1c1c1c" roughness={0.5} metalness={0.3} />
            </mesh>
            {/* Crown molding right */}
            <mesh position={[HALF_W - 0.04, HEIGHT - 0.06, z]}>
              <boxGeometry args={[0.08, 0.12, BAY * 0.8]} />
              <meshStandardMaterial color="#1c1c1c" roughness={0.5} metalness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* End wall */}
      <mesh position={[0, HEIGHT / 2, -LENGTH]}>
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  );
}

/* ── Gold Accent Lines ── */
function GoldAccents() {
  return (
    <group>
      {/* Continuous floor edge lines */}
      <mesh position={[-HALF_W + 0.01, 0.003, -LENGTH / 2]}>
        <boxGeometry args={[0.02, 0.006, LENGTH]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.2} />
      </mesh>
      <mesh position={[HALF_W - 0.01, 0.003, -LENGTH / 2]}>
        <boxGeometry args={[0.02, 0.006, LENGTH]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.2} />
      </mesh>
      {/* Ceiling edge accent */}
      <mesh position={[-HALF_W + 0.01, HEIGHT - 0.003, -LENGTH / 2]}>
        <boxGeometry args={[0.015, 0.006, LENGTH]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.1} />
      </mesh>
      <mesh position={[HALF_W - 0.01, HEIGHT - 0.003, -LENGTH / 2]}>
        <boxGeometry args={[0.015, 0.006, LENGTH]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

/* ── Ceiling Spot Lights ── */
function RoomLights() {
  return (
    <>
      {Array.from({ length: BAYS }).map((_, i) => {
        if (i % 2 !== 0) return null;
        const z = -i * BAY - BAY / 2;
        return (
          <group key={`rl-${i}`}>
            <spotLight
              position={[0, HEIGHT - 0.15, z]}
              angle={0.7}
              penumbra={0.9}
              intensity={0.6}
              color="#d4a843"
              distance={10}
              decay={2}
              target-position={[0, 0, z]}
            />
            {/* Light fixture */}
            <mesh position={[0, HEIGHT - 0.03, z]}>
              <cylinderGeometry args={[0.12, 0.15, 0.04, 16]} />
              <meshBasicMaterial color="#d4a843" transparent opacity={0.4} />
            </mesh>
            {/* Light glow ring */}
            <mesh position={[0, HEIGHT - 0.05, z]}>
              <ringGeometry args={[0.15, 0.22, 16]} />
              <meshBasicMaterial color="#d4a843" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* ── Dust Particles ── */
function Dust({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const { camera } = useThree();
  const count = 60;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * WIDTH * 0.7;
      arr[i * 3 + 1] = 0.3 + Math.random() * (HEIGHT - 0.6);
      arr[i * 3 + 2] = -Math.random() * LENGTH;
    }
    return arr;
  }, []);

  const speeds = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) s[i] = 0.2 + Math.random() * 0.4;
    return s;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const camZ = camera.position.z;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += Math.sin(t * speeds[i] + i * 3) * 0.001;
      pos[i * 3 + 1] += Math.cos(t * speeds[i] * 0.5 + i) * 0.0008;
      if (pos[i * 3 + 2] > camZ + 6) {
        pos[i * 3 + 2] = camZ - 10 - Math.random() * 25;
        pos[i * 3] = (Math.random() - 0.5) * WIDTH * 0.6;
        pos[i * 3 + 1] = 0.3 + Math.random() * (HEIGHT - 0.6);
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#d4a843" transparent opacity={0.35} size={1.2} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ── End Glow ── */
function EndGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 0.5) * 0.02;
  });
  return (
    <group position={[0, HEIGHT / 2, -LENGTH + 0.2]}>
      <mesh ref={ref}>
        <planeGeometry args={[WIDTH * 0.8, HEIGHT * 0.8]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#d4a843" intensity={1.2} distance={40} decay={2} />
    </group>
  );
}

/* ── Scene ── */
function Scene({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const followLight = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const p = progress.current;
    const targetZ = 1 - p * LENGTH * 0.88;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07);
    camera.position.y = EYE_H;
    camera.position.x = Math.sin(p * Math.PI * 2) * 0.08;
    camera.rotation.z = Math.sin(p * Math.PI * 3) * 0.005;

    if (followLight.current) {
      followLight.current.position.set(0, EYE_H + 0.5, camera.position.z + 0.5);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#050505", 2, 30]} />
      <ambientLight intensity={0.02} color="#d4a843" />
      <pointLight ref={followLight} color="#d4a843" intensity={0.25} distance={15} decay={2} />

      <Floor />
      <Ceiling />
      <Walls />
      <GoldAccents />
      <RoomLights />
      <EndGlow />
      <Dust progress={progress} />
    </>
  );
}

/* ── Mount ── */
const TunnelBackground = () => {
  const progressRef = useRef(0);
  const [docHeight, setDocHeight] = useState(1);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setDocHeight(Math.max(scrollable, 1));
    };
    update();
    window.addEventListener("resize", update);
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("resize", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const onScroll = () => { progressRef.current = window.scrollY / docHeight; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [docHeight]);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ fov: 65, near: 0.1, far: 120, position: [0, EYE_H, 1] }}
        style={{ background: "#050505" }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Scene progress={progressRef} />
      </Canvas>
    </div>
  );
};

export default TunnelBackground;
