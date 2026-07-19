// components/Scene.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import Crystals from './Crystals';

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 9], fov: 42 }}
      >
        <ParallaxGroup />
      </Canvas>
    </div>
  );
}

// Mouse parallax wrapping the whole scene
import { useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
function ParallaxGroup() {
  const group = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y +=
      (pointer.x * 0.18 - group.current.rotation.y) * 0.04;
    group.current.rotation.x +=
      (-pointer.y * 0.12 - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      <Crystals />
    </group>
  );
}