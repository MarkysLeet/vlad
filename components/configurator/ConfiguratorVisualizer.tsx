"use client";

import { useConfigStore } from "@/store/configuratorStore";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, ContactShadows, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function BannerModel() {
  const { width, height, material, productType } = useConfigStore();
  const mesh = useRef<THREE.Mesh>(null);
  
  // Calculate scale based on real dimensions (e.g. 1 unit = 1 meter)
  const scaleX = width / 100;
  const scaleY = height / 100;

  // Material properties
  const materialProps = useMemo(() => {
    return material === "glossy" 
        ? { roughness: 0.1, metalness: 0.0, envMapIntensity: 1.5 }
        : { roughness: 0.8, metalness: 0.0, envMapIntensity: 0.5 };
  }, [material]);

  // Texture loader could go here if we had textures. 
  // We'll use a procedural color/noise approach.

  return (
    <group>
        <mesh ref={mesh} castShadow receiveShadow>
            <planeGeometry args={[scaleX, scaleY, 32, 32]} />
            <meshStandardMaterial 
                color="#ffffff"
                side={THREE.DoubleSide}
                {...materialProps}
            />
        </mesh>

        {/* Procedural Grommets (Люверсы) for Wide Format */}
        {productType === "wide" && (
            <Grommets width={scaleX} height={scaleY} />
        )}
        
        {/* Placeholder print content */}
        <mesh position={[0, 0, 0.01]}>
             <planeGeometry args={[scaleX * 0.8, scaleY * 0.8]} />
             <meshBasicMaterial color="#CCFF00" transparent opacity={0.1} />
        </mesh>
    </group>
  );
}

function Grommets({ width, height }: { width: number, height: number }) {
    // Distribute rings along the perimeter
    const countX = Math.floor(width / 0.5); // every 50cm
    const countY = Math.floor(height / 0.5);
    
    const grommets = [];
    
    // Top/Bottom
    for (let i = 0; i <= countX; i++) {
        const x = -width/2 + (width * i / countX);
        grommets.push([x, height/2, 0]);
        grommets.push([x, -height/2, 0]);
    }
    // Left/Right (excluding corners already added)
    for (let i = 1; i < countY; i++) {
        const y = -height/2 + (height * i / countY);
        grommets.push([-width/2, y, 0]);
        grommets.push([width/2, y, 0]);
    }

    return (
        <group>
            {grommets.map((pos, idx) => (
                <mesh key={idx} position={new THREE.Vector3(...pos)} rotation={[0,0,0]}>
                    <torusGeometry args={[0.02, 0.005, 16, 32]} />
                    <meshStandardMaterial color="#aaaaaa" metalness={1.0} roughness={0.2} />
                </mesh>
            ))}
        </group>
    );
}

export default function ConfiguratorVisualizer() {
  return (
    <div className="w-full h-[50vh] md:h-full bg-gray-50 rounded-2xl overflow-hidden relative shadow-inner">
       <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-forest/50">
          REALTIME PREVIEW
       </div>
       
       <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
          <Environment preset="city" />
          <Stage environment={null} intensity={0.5} adjustCamera={false}>
             <BannerModel />
          </Stage>

          <ContactShadows
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={10}
            resolution={256}
            color="#000000"
          />

          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
       </Canvas>
    </div>
  );
}
