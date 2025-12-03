"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import PaperPlane from "./PaperPlane";
import { motion } from "framer-motion";

export default function HeroCanvas() {
  return (
    <section className="relative w-full h-[90vh] bg-white overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <PaperPlane />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="max-w-4xl px-6 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-forest tracking-tighter mix-blend-multiply"
          >
            Полиграфия 2.0: <br />
            От идеи до тиража за один диалог
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-forest/70 font-light"
          >
            Промышленная точность с легкостью мессенджера
          </motion.p>
        </div>
      </div>
    </section>
  );
}
