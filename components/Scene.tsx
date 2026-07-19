// components/Scene.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// Komponen Kristal Sederhana
function Crystal({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    // Rotasi halus
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <coneGeometry args={[0.78, 3.8, 5, 1]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.25}
          flatShading
        />
      </mesh>
      <mesh position={[0.7, -0.55, -0.15]} rotation={[0.2, 0.1, -0.42]}>
        <coneGeometry args={[0.46, 2.7, 5, 1]} />
        <meshStandardMaterial
          color="#080808"
          metalness={0.9}
          roughness={0.3}
          flatShading
        />
      </mesh>
      <mesh position={[-0.63, -0.72, 0.2]} rotation={[-0.2, 0.2, 0.38]}>
        <coneGeometry args={[0.42, 2.35, 5, 1]} />
        <meshStandardMaterial
          color="#0b0b0b"
          metalness={0.85}
          roughness={0.28}
          flatShading
        />
      </mesh>
    </group>
  );
}

// Komponen Partikel
function Particles() {
  const points = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 70;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      data[i * 3] = (Math.random() - 0.5) * 15;
      data[i * 3 + 1] = (Math.random() - 0.5) * 9;
      data[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d8c6a4"
        size={0.02}
        opacity={0.35}
        transparent
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Grup Kristal dengan Parallax
function CrystalWorld({ pointer }: { pointer: React.MutableRefObject<{x:number, y:number}> }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!rig.current) return;
    
    // Smooth parallax
    const targetX = -pointer.current.y * 0.06;
    const targetY = pointer.current.x * 0.1 + state.clock.elapsedTime * 0.01;
    
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, targetX, 0.05);
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={rig}>
      <Crystal position={[-4.1, 0.55, -1.5]} rotation={[0.12, 0.25, -0.35]} scale={1.36} />
      <Crystal position={[4.25, 0.2, -1.2]} rotation={[-0.1, -0.48, 0.42]} scale={1.15} />
      <Crystal position={[1.75, -3.15, -2.8]} rotation={[1.1, 0.15, 0.5]} scale={0.86} />
    </group>
  );
}

// Komponen Utama Scene
export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, isMobile ? 1 : 1.25]}
      camera={{ position: [0, 0, 8], fov: 41 }}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
      }}
      frameloop="always"
      style={{ pointerEvents: "none" }}
      onPointerMove={(e) => {
        e.stopPropagation();
        pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <color attach="background" args={["#060606"]} />
      <fog attach="fog" args={["#060606", 5, 14]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[-4, 3, 4]} color="#d8c6a4" intensity={1.8} />
      <directionalLight position={[4, -2, 2]} color="#ffffff" intensity={0.6} />
      
      <CrystalWorld pointer={pointer} />
      <Particles />
    </Canvas>
  );
}
