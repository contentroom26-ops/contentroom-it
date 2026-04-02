import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 120;

const TUNNEL_SEGMENTS = 60;
const TUNNEL_LENGTH = 120;
const TUNNEL_RADIUS = 3.5;

function Particles({ progress }: { progress: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const { positions, speeds, angles, radii, opacities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const spd = new Float32Array(PARTICLE_COUNT);
    const ang = new Float32Array(PARTICLE_COUNT);
    const rad = new Float32Array(PARTICLE_COUNT);
    const opa = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ang[i] = Math.random() * Math.PI * 2;
      rad[i] = 0.3 + Math.random() * (TUNNEL_RADIUS - 0.5);
      pos[i * 3] = Math.cos(ang[i]) * rad[i];
      pos[i * 3 + 1] = Math.sin(ang[i]) * rad[i];
      pos[i * 3 + 2] = -Math.random() * TUNNEL_LENGTH;
      spd[i] = 0.2 + Math.random() * 0.6;
      opa[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions: pos, speeds: spd, angles: ang, radii: rad, opacities: opa };
  }, []);

  const sizesAttr = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) s[i] = 1.5 + Math.random() * 3;
    return s;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const camZ = camera.position.z;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Gentle orbit
      angles[i] += speeds[i] * 0.003;
      posArr[i * 3] = Math.cos(angles[i]) * radii[i] + Math.sin(t * speeds[i] * 0.5) * 0.15;
      posArr[i * 3 + 1] = Math.sin(angles[i]) * radii[i] + Math.cos(t * speeds[i] * 0.3) * 0.15;

      // If particle is behind camera, respawn ahead
      if (posArr[i * 3 + 2] > camZ + 5) {
        posArr[i * 3 + 2] = camZ - 20 - Math.random() * 40;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={PARTICLE_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizesAttr} count={PARTICLE_COUNT} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4a843"
        transparent
        opacity={0.6}
        size={2.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}


function VolumetricLight() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(t * 0.8) * 0.04;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.08);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 0.6) * 0.03;
    }
  });

  const endZ = -TUNNEL_LENGTH;

  return (
    <group position={[0, 0, endZ]}>
      {/* Core bright disc */}
      <mesh ref={meshRef}>
        <circleGeometry args={[TUNNEL_RADIUS * 0.8, 32]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer glow halo */}
      <mesh ref={glowRef} position={[0, 0, 0.5]}>
        <circleGeometry args={[TUNNEL_RADIUS * 2, 32]} />
        <meshBasicMaterial color="#d4a843" transparent opacity={0.06} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* God rays — radial planes */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI;
        return (
          <mesh key={`ray-${i}`} rotation={[0, 0, angle]} position={[0, 0, 5]}>
            <planeGeometry args={[0.15, TUNNEL_RADIUS * 6]} />
            <meshBasicMaterial color="#d4a843" transparent opacity={0.03} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        );
      })}

      {/* Strong point light at end */}
      <pointLight color="#d4a843" intensity={2} distance={60} decay={2} />
      <pointLight color="#fff5e0" intensity={0.8} distance={30} decay={2} position={[0, 0, 5]} />
    </group>
  );
}

function TunnelScene({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const lightRef = useRef<THREE.PointLight>(null);

  const segments = useMemo(() => {
    const segs: { z: number; rot: number; accent: boolean }[] = [];
    for (let i = 0; i < TUNNEL_SEGMENTS; i++) {
      segs.push({
        z: -(i / TUNNEL_SEGMENTS) * TUNNEL_LENGTH,
        rot: (i * Math.PI) / 80,
        accent: i % 5 === 0,
      });
    }
    return segs;
  }, []);

  const edgeLines = useMemo(() => {
    const sides = 8;
    const lines: Float32Array[] = [];
    for (let s = 0; s < sides; s++) {
      const angle = (s / sides) * Math.PI * 2;
      const arr: number[] = [];
      for (let i = 0; i <= TUNNEL_SEGMENTS; i++) {
        const t = i / TUNNEL_SEGMENTS;
        const z = -t * TUNNEL_LENGTH;
        const twist = (i * Math.PI) / 80;
        const r = TUNNEL_RADIUS + Math.sin(i * 0.25) * 0.2;
        arr.push(
          Math.cos(angle + twist) * r,
          Math.sin(angle + twist) * r,
          z
        );
      }
      lines.push(new Float32Array(arr));
    }
    return lines;
  }, []);

  useFrame((_, delta) => {
    const p = progress.current;
    const targetZ = 3 - p * TUNNEL_LENGTH * 0.9;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    camera.rotation.z = Math.sin(p * Math.PI * 4) * 0.02;

    if (lightRef.current) {
      lightRef.current.position.z = camera.position.z + 2;
      lightRef.current.intensity = 0.4 + Math.sin(p * Math.PI * 6) * 0.15;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 4, 40]} />
      <ambientLight intensity={0.05} color="#d4a843" />
      <pointLight ref={lightRef} position={[0, 0, 3]} intensity={0.5} color="#d4a843" distance={25} decay={2} />
      <pointLight position={[0, 0, -TUNNEL_LENGTH * 0.5]} intensity={0.3} color="#d4a843" distance={40} decay={2} />

      {/* Ring segments */}
      {segments.map((seg, i) => (
        <mesh key={i} position={[0, 0, seg.z]} rotation={[0, 0, seg.rot]}>
          <ringGeometry args={[TUNNEL_RADIUS - 0.03, TUNNEL_RADIUS + (seg.accent ? 0.06 : 0.02), 8]} />
          <meshBasicMaterial
            color="#d4a843"
            transparent
            opacity={seg.accent ? 0.18 : 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Edge lines */}
      {edgeLines.map((arr, i) => (
        <line key={`edge-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={arr}
              count={arr.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#d4a843" transparent opacity={0.04} />
        </line>
      ))}

      {/* Cross beams at accent points */}
      {segments.filter(s => s.accent).map((seg, i) => (
        <group key={`cross-${i}`} position={[0, 0, seg.z]} rotation={[0, 0, seg.rot]}>
          {[0, 1, 2, 3].map(j => {
            const a = (j / 4) * Math.PI * 2 + Math.PI / 8;
            return (
              <mesh key={j} position={[Math.cos(a) * TUNNEL_RADIUS * 0.5, Math.sin(a) * TUNNEL_RADIUS * 0.5, 0]} rotation={[0, 0, a]}>
                <boxGeometry args={[TUNNEL_RADIUS, 0.01, 0.01]} />
                <meshBasicMaterial color="#d4a843" transparent opacity={0.04} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Floating particles */}
      <Particles progress={progress} />
    </>
  );
}

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
        camera={{ fov: 75, near: 0.1, far: 150, position: [0, 0, 3] }}
        style={{ background: "hsl(0 0% 5%)" }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <TunnelScene progress={progressRef} />
      </Canvas>
    </div>
  );
};

export default TunnelBackground;
