"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PaperPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      // Store original positions to calculate waves from a stable base
      originalPositionsRef.current = geometry.attributes.position.array.slice() as Float32Array;
    }
  }, []);

  useFrame((state) => {
    if (meshRef.current && originalPositionsRef.current) {
      const time = state.clock.getElapsedTime();
      const geometry = meshRef.current.geometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const originals = originalPositionsRef.current;
      const count = geometry.attributes.position.count;

      for (let i = 0; i < count; i++) {
        const x = originals[i * 3];
        const y = originals[i * 3 + 1];

        // Replicate the gentle wave effect from the previous shader
        // elevation = sin(x * 2.0 + t * 0.5) * 0.1 + sin(y * 1.5 + t * 0.3) * 0.1
        let elevation = Math.sin(x * 2.0 + time * 0.5) * 0.1;
        elevation += Math.sin(y * 1.5 + time * 0.3) * 0.1;

        // Apply to Z axis
        positions[i * 3 + 2] = elevation;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -1, 0]} receiveShadow castShadow>
      {/* High segment count for smooth wave deformation */}
      <planeGeometry args={[12, 12, 64, 64]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.65}
        metalness={0.0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
