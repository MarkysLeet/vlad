"use client";

import ConfiguratorControls from "./ConfiguratorControls";
import ConfiguratorVisualizer from "./ConfiguratorVisualizer";

export default function ConfiguratorSection() {
  return (
    <section className="min-h-screen w-full py-32 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto h-full flex flex-col md:grid md:grid-cols-2 gap-8 md:h-[800px]">
        {/* Left: Visualizer */}
        <div className="order-1 md:order-1 h-full">
            <ConfiguratorVisualizer />
        </div>

        {/* Right: Controls */}
        <div className="order-2 md:order-2 h-full">
            <ConfiguratorControls />
        </div>
      </div>
    </section>
  );
}
