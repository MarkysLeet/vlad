import { create } from "zustand";

export type ProductType = "wide" | "textile" | "sheet";
export type MaterialType = "matte" | "glossy";

interface ConfigState {
  productType: ProductType;
  width: number; // in cm
  height: number; // in cm
  material: MaterialType;
  quantity: number;
  price: number;
  
  setProductType: (type: ProductType) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setMaterial: (material: MaterialType) => void;
  setQuantity: (qty: number) => void;
  recalculatePrice: () => void;
}

const BASE_PRICES: Record<ProductType, number> = {
  wide: 500,   // Base price per m2
  textile: 1200,
  sheet: 50,    // Base price per unit
};

const MATERIAL_MULTIPLIER: Record<MaterialType, number> = {
  matte: 1.0,
  glossy: 1.2,
};

export const useConfigStore = create<ConfigState>((set, get) => ({
  productType: "wide",
  width: 200,
  height: 100,
  material: "matte",
  quantity: 1,
  price: 1000, // Initial mock

  recalculatePrice: () => {
    const s = get();
    const area = (s.width * s.height) / 10000; // cm2 to m2
    const basePrice = BASE_PRICES[s.productType];
    const materialFactor = MATERIAL_MULTIPLIER[s.material];
    
    let total = 0;
    
    if (s.productType === "sheet") {
       // For sheets, simplified logic
       const sizeFactor = area * 200; 
       total = (basePrice + sizeFactor) * materialFactor * s.quantity;
    } else {
       // Roll media
       total = area * basePrice * materialFactor * s.quantity;
    }
    
    // Minimum price cap
    total = Math.max(total, 500);
    
    set({ price: Math.round(total) });
  },

  setProductType: (type) => {
    set({ productType: type });
    get().recalculatePrice();
  },
  
  setWidth: (width) => {
    set({ width });
    get().recalculatePrice();
  },
  
  setHeight: (height) => {
    set({ height });
    get().recalculatePrice();
  },
  
  setMaterial: (material) => {
    set({ material });
    get().recalculatePrice();
  },

  setQuantity: (qty) => {
    set({ quantity: qty });
    get().recalculatePrice();
  },
}));
