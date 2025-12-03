"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { paperVertexShader, paperFragmentShader } from "./shaders";

export default function PaperPlane() {
  const mesh = useRef<THREE.Mesh>(null);
  
  // Uniforms for the shader
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorBg: { value: new THREE.Color("#F5F5F7") }, // Paper color
      uColorAccent: { value: new THREE.Color("#CCFF00") }, // Electric Lime
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Map mouse position to normalized device coordinates (-1 to +1) roughly
      // In a real app we might want to raycast, but simple mapping works for effect
      const mouseX = (state.pointer.x * state.viewport.width) / 2;
      const mouseY = (state.pointer.y * state.viewport.height) / 2;
      
      // Smoothly interpolate mouse uniform
      material.uniforms.uMouse.value.lerp(new THREE.Vector2(mouseX, mouseY), 0.1);
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 3, 0, 0]} position={[0, -1, 0]}>
      {/* High segment count for smooth wave deformation */}
      <planeGeometry args={[12, 12, 64, 64]} />
      <shaderMaterial
        vertexShader={paperVertexShader}
        fragmentShader={paperFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
