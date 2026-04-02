import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CORRIDOR_LENGTH = 120;
const CORRIDOR_WIDTH = 4;
const CORRIDOR_HEIGHT = 3.5;
const PARTICLE_COUNT = 80;
const SECTION_DEPTH = 6; // depth of each architectural bay

/* ── Dust Particles ── */
function DustParticles({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * CORRIDOR_WIDTH * 0.8;
      arr[i * 3 + 1] = Math.random() * CORRIDOR_HEIGHT * 0.7;
      arr[i * 3 + 2] = -Math.random() * CORRIDOR_LENGTH;
    }
    return arr;
  }, []);

  const speeds = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) s[i] = 0.3 + Math.random() * 0.5;
    return s;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const camZ = camera.position.z;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += Math.sin(t * speeds[i] + i) * 0.002;
      pos[i * 3 + 1] += Math.cos(t * speeds[i] * 0.7 + i) * 0.001;
      if (pos[i * 3 + 2] > camZ + 8) {
        pos[i * 3 + 2] = camZ - 15 - Math.random() * 30;
        pos[i * 3] = (Math.random() - 0.5) * CORRIDOR_WIDTH * 0.7;
        pos[i * 3 + 1] = Math.random() * CORRIDOR_HEIGHT * 0.6;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={PARTICLE_COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#d4a843" transparent opacity={0.4} size={1.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ── Corridor Architecture ── */
function Corridor() {
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#0f0f0f",
    roughness: 0.85,
    metalness: 0.1,
    side: THREE.DoubleSide,
  }), []);

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1a1a1a",
    roughness: 0.7,
    metalness: 0.2,
    side: THREE.DoubleSide,
  }), []);

  const edgeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#d4a843",
    transparent: true,
    opacity: 0.08,
  }), []);

  const glowEdgeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#d4a843",
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const halfW = CORRIDOR_WIDTH / 2;
  const bays = Math.floor(CORRIDOR_LENGTH / SECTION_DEPTH);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, CORRIDOR_HEIGHT, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#080808" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-halfW, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_LENGTH, CORRIDOR_HEIGHT]} />
        {wallMat}
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[halfW, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_LENGTH, CORRIDOR_HEIGHT]} />
        {wallMat}
      </mesh>

      {/* Architectural bays — pilasters & ceiling beams */}
      {Array.from({ length: bays }).map((_, i) => {
        const z = -i * SECTION_DEPTH;
        const isAccent = i % 3 === 0;
        return (
          <group key={`bay-${i}`}>
            {/* Left pilaster */}
            <mesh position={[-halfW + 0.06, CORRIDOR_HEIGHT / 2, z]}>
              <boxGeometry args={[0.12, CORRIDOR_HEIGHT, 0.3]} />
              {accentMat}
            </mesh>
            {/* Right pilaster */}
            <mesh position={[halfW - 0.06, CORRIDOR_HEIGHT / 2, z]}>
              <boxGeometry args={[0.12, CORRIDOR_HEIGHT, 0.3]} />
              {accentMat}
            </mesh>

            {/* Ceiling beam */}
            <mesh position={[0, CORRIDOR_HEIGHT - 0.06, z]}>
              <boxGeometry args={[CORRIDOR_WIDTH, 0.12, 0.2]} />
              {accentMat}
            </mesh>

            {/* Floor edge lines (gold accents) */}
            <mesh position={[-halfW + 0.02, 0.005, z - SECTION_DEPTH / 2]}>
              <boxGeometry args={[0.02, 0.01, SECTION_DEPTH]} />
              {isAccent ? glowEdgeMat : edgeMat}
            </mesh>
            <mesh position={[halfW - 0.02, 0.005, z - SECTION_DEPTH / 2]}>
              <boxGeometry args={[0.02, 0.01, SECTION_DEPTH]} />
              {isAccent ? glowEdgeMat : edgeMat}
            </mesh>

            {/* Ceiling edge lines */}
            <mesh position={[-halfW + 0.02, CORRIDOR_HEIGHT - 0.005, z - SECTION_DEPTH / 2]}>
              <boxGeometry args={[0.02, 0.01, SECTION_DEPTH]} />
              {edgeMat}
            </mesh>
            <mesh position={[halfW - 0.02, CORRIDOR_HEIGHT - 0.005, z - SECTION_DEPTH / 2]}>
              <boxGeometry args={[0.02, 0.01, SECTION_DEPTH]} />
              {edgeMat}
            </mesh>

            {/* Recessed wall panels (left) */}
            <mesh position={[-halfW + 0.01, CORRIDOR_HEIGHT * 0.5, z - SECTION_DEPTH / 2]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[SECTION_DEPTH * 0.7, CORRIDOR_HEIGHT * 0.5]} />
              <meshStandardMaterial color="#0c0c0c" roughness={0.95} metalness={0.05} side={THREE.DoubleSide} />
            </mesh>
            {/* Recessed wall panels (right) */}
            <mesh position={[halfW - 0.01, CORRIDOR_HEIGHT * 0.5, z - SECTION_DEPTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[SECTION_DEPTH * 0.7, CORRIDOR_HEIGHT * 0.5]} />
              <meshStandardMaterial color="#0c0c0c" roughness={0.95} metalness={0.05} side={THREE.DoubleSide} />
            </mesh>

            {/* Accent strip lights on ceiling every 3 bays */}
            {isAccent && (
              <mesh position={[0, CORRIDOR_HEIGHT - 0.01, z]}>
                <boxGeometry args={[CORRIDOR_WIDTH * 0.3, 0.02, 0.08]} />
                <meshBasicMaterial color="#d4a843" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* End wall with light portal */}
      <mesh position={[0, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_HEIGHT]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ── Volumetric End Light ── */
function EndLight() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const t = state.clock.elapsedTime;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + Math.sin(t * 0.6) * 0.03;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.05);
    }
  });

  return (
    <group position={[0, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH + 0.1]}>
      {/* Glow disc */}
      <mesh ref={glowRef}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {/* God rays */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI]} position={[0, 0, 2]}>
          <planeGeometry args={[0.08, 8]} />
          <meshBasicMaterial color="#d4a843" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <pointLight color="#d4a843" intensity={1.5} distance={50} decay={2} />
      <pointLight color="#fff5e0" intensity={0.5} distance={25} decay={2} position={[0, 0, 3]} />
    </group>
  );
}

/* ── Corridor Lights (recessed spots) ── */
function CorridorLights() {
  const count = Math.floor(CORRIDOR_LENGTH / SECTION_DEPTH);
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        if (i % 3 !== 0) return null;
        const z = -i * SECTION_DEPTH;
        return (
          <group key={`light-${i}`}>
            <spotLight
              position={[0, CORRIDOR_HEIGHT - 0.1, z]}
              target-position={[0, 0, z]}
              angle={0.6}
              penumbra={0.8}
              intensity={0.4}
              color="#d4a843"
              distance={8}
              decay={2}
              castShadow={false}
            />
            {/* Visible light fixture */}
            <mesh position={[0, CORRIDOR_HEIGHT - 0.02, z]}>
              <boxGeometry args={[0.3, 0.02, 0.15]} />
              <meshBasicMaterial color="#d4a843" transparent opacity={0.3} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* ── Main Scene ── */
function CorridorScene({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const camLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const p = progress.current;
    const targetZ = 2 - p * CORRIDOR_LENGTH * 0.88;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.position.y = CORRIDOR_HEIGHT * 0.45;
    camera.rotation.z = Math.sin(p * Math.PI * 3) * 0.008;

    if (camLightRef.current) {
      camLightRef.current.position.set(0, CORRIDOR_HEIGHT * 0.6, camera.position.z + 1);
      camLightRef.current.intensity = 0.3 + Math.sin(p * Math.PI * 4) * 0.1;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#050505", 3, 35]} />
      <ambientLight intensity={0.03} color="#d4a843" />
      <pointLight ref={camLightRef} color="#d4a843" intensity={0.3} distance={20} decay={2} />

      <Corridor />
      <CorridorLights />
      <EndLight />
      <DustParticles progress={progress} />
    </>
  );
}

/* ── Canvas Wrapper ── */
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
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      progressRef.current = window.scrollY / docHeight;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [docHeight]);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ fov: 70, near: 0.1, far: 150, position: [0, CORRIDOR_HEIGHT * 0.45, 2] }}
        style={{ background: "#050505" }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <CorridorScene progress={progressRef} />
      </Canvas>
    </div>
  );
};

export default TunnelBackground;
