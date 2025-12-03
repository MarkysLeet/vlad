"use client";

import { useConfigStore } from "@/store/configuratorStore";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ConfiguratorControls() {
  const store = useConfigStore();
  
  const generateDeepLink = () => {
    const data = {
        type: store.productType,
        size: `${store.width}x${store.height}`,
        material: store.material,
        hasGrommets: store.hasGrommets,
        qty: store.quantity,
        price: store.price
    };
    const encoded = btoa(JSON.stringify(data));
    console.log("Order Data:", data);
    return `tg://resolve?domain=P_Typography_Bot&start=${encoded}`;
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-forest/5 flex flex-col gap-8 h-full">
      
      {/* Tabs: Product Type */}
      <div className="flex p-1 bg-gray-100 rounded-lg relative">
         {(["wide", "textile", "sheet"] as const).map((type) => (
             <button
                key={type}
                onClick={() => store.setProductType(type)}
                className={cn(
                    "flex-1 py-3 text-sm font-medium uppercase tracking-wide rounded-md transition-all duration-300 z-10",
                    store.productType === type 
                        ? "text-forest shadow-sm bg-white" 
                        : "text-forest/40 hover:text-forest/70"
                )}
             >
                {type === "wide" && "Широкоформат"}
                {type === "textile" && "Текстиль"}
                {type === "sheet" && "Листовая"}
                
                {store.productType === type && (
                    <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime"
                    />
                )}
             </button>
         ))}
      </div>

      {/* Sliders: Dimensions */}
      <div className="space-y-6">
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label className="text-sm uppercase tracking-wider text-forest/60">Ширина (см)</label>
                <span className="text-2xl font-bold text-forest">{store.width}</span>
            </div>
            <input 
                type="range" 
                min="50" max="500" step="10"
                value={store.width}
                onChange={(e) => store.setWidth(Number(e.target.value))}
                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-forest range-thumb-lg shadow-inner"
            />
        </div>

        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label className="text-sm uppercase tracking-wider text-forest/60">Высота (см)</label>
                <span className="text-2xl font-bold text-forest">{store.height}</span>
            </div>
            <input 
                type="range" 
                min="50" max="300" step="10"
                value={store.height}
                onChange={(e) => store.setHeight(Number(e.target.value))}
                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-forest range-thumb-lg shadow-inner"
            />
        </div>
      </div>

      {/* Materials */}
      <div className="space-y-4">
        <label className="text-sm uppercase tracking-wider text-forest/60">Материал</label>
        <div className="grid grid-cols-2 gap-4">
            <button
                onClick={() => store.setMaterial("matte")}
                className={cn(
                    "h-24 rounded-xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center gap-2 group",
                    store.material === "matte" ? "border-lime bg-forest/5" : "border-gray-200 hover:border-forest/30"
                )}
            >
                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                <span className="relative z-10 font-medium text-forest">Матовый</span>
                {store.material === "matte" && <Check size={16} className="text-lime" />}
            </button>

            <button
                onClick={() => store.setMaterial("glossy")}
                className={cn(
                    "h-24 rounded-xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center gap-2 group",
                    store.material === "glossy" ? "border-lime bg-white" : "border-gray-200 hover:border-forest/30"
                )}
            >
                 {/* Specular gradient imitation */}
                 {/* Static background for glossy feel + hover animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none transform translate-x-[-100%] group-hover:translate-x-[100%]" />

                <span className="relative z-10 font-medium text-forest">Глянцевый</span>
                {store.material === "glossy" && <Check size={16} className="text-lime" />}
            </button>
        </div>
      </div>

      {/* Grommets Option - Only for Wide Format */}
      {store.productType === "wide" && (
        <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => store.setHasGrommets(!store.hasGrommets)}>
            <label className="text-sm uppercase tracking-wider text-forest/60 cursor-pointer select-none">С люверсами</label>
            <div className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center",
                store.hasGrommets ? "bg-lime shadow-neon" : "bg-gray-200 shadow-inner"
            )}>
                <motion.div
                    layout
                    className="w-4 h-4 bg-forest rounded-full shadow-sm"
                    animate={{ x: store.hasGrommets ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <label className="text-sm uppercase tracking-wider text-forest/60">Тираж</label>
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => store.setQuantity(Math.max(1, store.quantity - 1))}
                    className="w-8 h-8 rounded-full border border-forest/20 flex items-center justify-center hover:bg-forest hover:text-white transition-colors"
                >
                    -
                </button>
                <span className="text-xl font-bold w-8 text-center">{store.quantity}</span>
                <button 
                    onClick={() => store.setQuantity(store.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-forest/20 flex items-center justify-center hover:bg-forest hover:text-white transition-colors"
                >
                    +
                </button>
            </div>
         </div>
      </div>

      <div className="flex-1" /> {/* Spacer */}

      {/* Footer / CTA */}
      <div className="space-y-4 pt-8 border-t border-forest/10">
        <div className="flex justify-between items-end">
            <span className="text-forest/60 mb-2">Итого:</span>
            <motion.span 
                key={store.price} // Re-animate on change
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black text-forest"
            >
                {store.price.toLocaleString()} ₽
            </motion.span>
        </div>

        <a 
            href={generateDeepLink()}
            className="w-full bg-gradient-to-b from-lime-400 to-lime-500 text-forest py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] shadow-neon transition-all duration-300 transform active:scale-[0.98] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]"
        >
            <span>Рассчитать в Telegram</span>
            <Send size={20} />
        </a>
      </div>

    </div>
  );
}
