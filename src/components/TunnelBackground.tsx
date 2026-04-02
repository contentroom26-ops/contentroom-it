import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import tunnelImg from "@/assets/tunnel-bg.jpg";

const LENGTH = 100;
const WIDTH = 5;
const HEIGHT = 4;
const HALF_W = WIDTH / 2;
const EYE_H = 1.6;
const BAY = 5;
const BAYS = Math.floor(LENGTH / BAY);

/* ── Procedural concrete-like canvas texture ── */
function makeTexture(
  base: [number, number, number],
  size = 512,
  grain = true
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base color
  ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
  ctx.fillRect(0, 0, size, size);

  // Grain noise
  if (grain) {
    const imageData = ctx.getImageData(0, 0, size, size);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 18;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // Subtle cracks / stains
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = Math.random() > 0.5 ? "#000" : "#222";
    ctx.lineWidth = Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(Math.random() * size, Math.random() * size);
    ctx.lineTo(Math.random() * size, Math.random() * size);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* ── Floor ── */
function Floor() {
  const tex = useMemo(() => {
    const t = makeTexture([18, 18, 18]);
    t.repeat.set(4, LENGTH / 2);
    return t;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -LENGTH / 2]}>
        <planeGeometry args={[WIDTH, LENGTH]} />
        <meshStandardMaterial map={tex} roughness={0.35} metalness={0.5} color="#1a1a1a" />
      </mesh>
      {/* Subtle floor reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, -LENGTH / 2]}>
        <planeGeometry args={[WIDTH, LENGTH]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* ── Ceiling ── */
function CeilingComp() {
  const tex = useMemo(() => {
    const t = makeTexture([12, 12, 12]);
    t.repeat.set(3, LENGTH / 3);
    return t;
  }, []);

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, HEIGHT, -LENGTH / 2]}>
        <planeGeometry args={[WIDTH, LENGTH]} />
        <meshStandardMaterial map={tex} roughness={0.9} metalness={0.05} color="#0d0d0d" />
      </mesh>
      {/* Ceiling beams */}
      {Array.from({ length: BAYS + 1 }).map((_, i) => (
        <mesh key={i} position={[0, HEIGHT - 0.12, -i * BAY]}>
          <boxGeometry args={[WIDTH + 0.1, 0.24, 0.18]} />
          <meshStandardMaterial color="#161616" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Walls ── */
function WallsComp() {
  const wallTex = useMemo(() => {
    const t = makeTexture([16, 15, 14]);
    t.repeat.set(LENGTH / 4, 2);
    return t;
  }, []);

  const panelTex = useMemo(() => {
    const t = makeTexture([10, 10, 10], 256, false);
    t.repeat.set(1, 1);
    return t;
  }, []);

  return (
    <group>
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HALF_W, HEIGHT / 2, -LENGTH / 2]}>
        <planeGeometry args={[LENGTH, HEIGHT]} />
        <meshStandardMaterial map={wallTex} roughness={0.82} metalness={0.08} color="#121110" side={THREE.DoubleSide} />
      </mesh>
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HALF_W, HEIGHT / 2, -LENGTH / 2]}>
        <planeGeometry args={[LENGTH, HEIGHT]} />
        <meshStandardMaterial map={wallTex} roughness={0.82} metalness={0.08} color="#121110" side={THREE.DoubleSide} />
      </mesh>

      {/* Per-bay details */}
      {Array.from({ length: BAYS }).map((_, i) => {
        const z = -i * BAY;
        const zMid = z - BAY / 2;
        return (
          <group key={i}>
            {/* Pilasters */}
            {[-1, 1].map((side) => (
              <mesh key={side} position={[side * (HALF_W - 0.07), HEIGHT / 2, z]}>
                <boxGeometry args={[0.14, HEIGHT, 0.28]} />
                <meshStandardMaterial color="#1a1917" roughness={0.55} metalness={0.3} />
              </mesh>
            ))}

            {/* Recessed panels */}
            {[-1, 1].map((side) => (
              <mesh key={`p${side}`} position={[side * (HALF_W - 0.015), HEIGHT * 0.47, zMid]} rotation={[0, side * -Math.PI / 2, 0]}>
                <planeGeometry args={[BAY * 0.72, HEIGHT * 0.52]} />
                <meshStandardMaterial map={panelTex} roughness={0.9} metalness={0.05} color="#0c0c0b" side={THREE.DoubleSide} />
              </mesh>
            ))}

            {/* Panel frame / moulding */}
            {[-1, 1].map((side) => (
              <group key={`frame${side}`}>
                {/* Top rail */}
                <mesh position={[side * (HALF_W - 0.04), HEIGHT * 0.73, zMid]}>
                  <boxGeometry args={[0.05, 0.03, BAY * 0.72]} />
                  <meshStandardMaterial color="#1e1d1a" roughness={0.5} metalness={0.35} />
                </mesh>
                {/* Bottom rail */}
                <mesh position={[side * (HALF_W - 0.04), HEIGHT * 0.21, zMid]}>
                  <boxGeometry args={[0.05, 0.03, BAY * 0.72]} />
                  <meshStandardMaterial color="#1e1d1a" roughness={0.5} metalness={0.35} />
                </mesh>
              </group>
            ))}

            {/* Baseboard */}
            {[-1, 1].map((side) => (
              <mesh key={`base${side}`} position={[side * (HALF_W - 0.035), 0.06, zMid]}>
                <boxGeometry args={[0.07, 0.12, BAY * 0.85]} />
                <meshStandardMaterial color="#1a1917" roughness={0.45} metalness={0.35} />
              </mesh>
            ))}

            {/* Crown moulding */}
            {[-1, 1].map((side) => (
              <mesh key={`crown${side}`} position={[side * (HALF_W - 0.035), HEIGHT - 0.05, zMid]}>
                <boxGeometry args={[0.07, 0.1, BAY * 0.85]} />
                <meshStandardMaterial color="#1a1917" roughness={0.45} metalness={0.35} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* End wall with the real corridor image */}
      <EndWall />
    </group>
  );
}

/* ── End wall with real photo ── */
function EndWall() {
  const tex = useTexture(tunnelImg);
  return (
    <mesh position={[0, HEIGHT / 2, -LENGTH + 0.05]}>
      <planeGeometry args={[WIDTH, HEIGHT]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

/* ── Gold accent lines ── */
function GoldAccents() {
  return (
    <group>
      {/* Floor edge strips */}
      {[-1, 1].map((side) => (
        <mesh key={`fe${side}`} position={[side * (HALF_W - 0.005), 0.004, -LENGTH / 2]}>
          <boxGeometry args={[0.012, 0.008, LENGTH]} />
          <meshBasicMaterial color="#d4a843" transparent opacity={0.22} />
        </mesh>
      ))}
      {/* Ceiling edge strips */}
      {[-1, 1].map((side) => (
        <mesh key={`ce${side}`} position={[side * (HALF_W - 0.005), HEIGHT - 0.004, -LENGTH / 2]}>
          <boxGeometry args={[0.012, 0.008, LENGTH]} />
          <meshBasicMaterial color="#d4a843" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Ceiling recessed lights ── */
function Lights() {
  return (
    <>
      {Array.from({ length: BAYS }).map((_, i) => {
        if (i % 2 !== 0) return null;
        const z = -i * BAY - BAY / 2;
        return (
          <group key={i}>
            <spotLight
              position={[0, HEIGHT - 0.2, z]}
              angle={0.65}
              penumbra={0.85}
              intensity={0.7}
              color="#e8c675"
              distance={10}
              decay={2}
            />
            {/* Fixture body */}
            <mesh position={[0, HEIGHT - 0.04, z]}>
              <cylinderGeometry args={[0.1, 0.13, 0.05, 12]} />
              <meshStandardMaterial color="#2a2720" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Glow disc */}
            <mesh position={[0, HEIGHT - 0.07, z]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.1, 12]} />
              <meshBasicMaterial color="#d4a843" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* ── Dust ── */
function Dust({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const { camera } = useThree();
  const N = 50;

  const positions = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * WIDTH * 0.6;
      a[i * 3 + 1] = 0.4 + Math.random() * (HEIGHT - 0.8);
      a[i * 3 + 2] = -Math.random() * LENGTH;
    }
    return a;
  }, []);

  const speeds = useMemo(() => {
    const s = new Float32Array(N);
    for (let i = 0; i < N; i++) s[i] = 0.15 + Math.random() * 0.35;
    return s;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const camZ = camera.position.z;
    for (let i = 0; i < N; i++) {
      pos[i * 3] += Math.sin(t * speeds[i] + i * 2.7) * 0.0008;
      pos[i * 3 + 1] += Math.cos(t * speeds[i] * 0.6 + i) * 0.0005;
      if (pos[i * 3 + 2] > camZ + 5) {
        pos[i * 3 + 2] = camZ - 8 - Math.random() * 20;
        pos[i * 3] = (Math.random() - 0.5) * WIDTH * 0.5;
        pos[i * 3 + 1] = 0.4 + Math.random() * (HEIGHT - 0.8);
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={N} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#e8c675" transparent opacity={0.25} size={1} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ── End Glow ── */
function EndGlow() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((s) => {
    if (ref.current) ref.current.intensity = 1 + Math.sin(s.clock.elapsedTime * 0.4) * 0.3;
  });
  return (
    <group position={[0, HEIGHT / 2, -LENGTH + 1]}>
      <pointLight ref={ref} color="#d4a843" intensity={1} distance={45} decay={2} />
      <pointLight color="#fff5e0" intensity={0.4} distance={20} decay={2} position={[0, 0, 2]} />
    </group>
  );
}

/* ── Scene ── */
function Scene({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const followLight = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const p = progress.current;
    const targetZ = 0.5 - p * LENGTH * 0.88;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.position.y = EYE_H;
    camera.position.x = Math.sin(p * Math.PI * 1.5) * 0.06;

    if (followLight.current) {
      followLight.current.position.set(0, EYE_H + 0.8, camera.position.z + 0.3);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#040404", 1.5, 28]} />
      <ambientLight intensity={0.015} color="#e8c675" />
      <pointLight ref={followLight} color="#e8c675" intensity={0.2} distance={12} decay={2} />

      <Floor />
      <CeilingComp />
      <WallsComp />
      <GoldAccents />
      <Lights />
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
        camera={{ fov: 60, near: 0.1, far: 120, position: [0, EYE_H, 0.5] }}
        style={{ background: "#040404" }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
        dpr={[1, 1.5]}
      >
        <Scene progress={progressRef} />
      </Canvas>
    </div>
  );
};

export default TunnelBackground;
