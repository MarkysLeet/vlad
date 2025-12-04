import { create } from "zustand";

export type ProductType = "wide" | "textile" | "sheet";
export type MaterialType = "matte" | "glossy";

interface ConfigState {
  productType: ProductType;
  width: number; // in cm
  height: number; // in cm
  material: MaterialType;
  quantity: number;
  hasGrommets: boolean;
  price: number;
  
  setProductType: (type: ProductType) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setMaterial: (material: MaterialType) => void;
  setQuantity: (qty: number) => void;
  setHasGrommets: (hasGrommets: boolean) => void;
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
  hasGrommets: false,
  price: 900, // Initial calculation: 2m * 1m * 450 = 900

  recalculatePrice: () => {
    const s = get();

    // Logic for Wide Format as per specific requirements
    if (s.productType === "wide") {
        const area = (s.width / 100) * (s.height / 100); // m^2
        const pricePerMeterSq = 450;
        const minPrice = 500;
        const grommetPrice = 15;

        let grommetCost = 0;
        if (s.hasGrommets) {
            const perimeter = ((s.width + s.height) * 2) / 100; // meters
            const grommetCount = Math.ceil(perimeter / 0.3);
            grommetCost = grommetCount * grommetPrice;
        }

        // Base calculation: Area * Price + Grommets
        // Note: Material multiplier was not in the specific 'Wide' formula provided,
        // but typically materials affect price.
        // User instruction: "Total = Math.max(minPrice, (Area * pricePerMeterSq) + (GrommetCount * grommetPrice))"
        // I will follow the user's formula EXACTLY for Wide format and ignore MATERIAL_MULTIPLIER for now
        // unless they asked, to be safe.
        // However, the user also asked to keep "Material" sliders.
        // If I ignore material, the material slider does nothing for price.
        // I'll stick to the user's explicit formula for now.

        let total = (area * pricePerMeterSq) + grommetCost;

        // Apply quantity
        total = total * s.quantity;

        // Apply min price logic (per item or total? Usually total for the order, but let's assume per item logic capped, or total capped?)
        // Formula said: TotalPrice = Math.max(minPrice, ...)
        // Usually minPrice is for the whole print job.
        // Let's assume the calc is per unit, then multiplied by quantity, OR the whole batch is min 500.
        // Given "MVP" and "Order", often min price is for the job.
        // Let's calculate total raw then apply max.

        total = Math.max(minPrice, total);

        set({ price: Math.round(total) });
        return;
    }

    // Fallback logic for other types (Textile, Sheet) - preserving previous structure roughly
    const area = (s.width * s.height) / 10000; // cm2 to m2
    const basePrice = BASE_PRICES[s.productType];
    const materialFactor = MATERIAL_MULTIPLIER[s.material];
    
    let total = 0;
    
    if (s.productType === "sheet") {
       const sizeFactor = area * 200; 
       total = (basePrice + sizeFactor) * materialFactor * s.quantity;
    } else {
       total = area * basePrice * materialFactor * s.quantity;
    }
    
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

  setHasGrommets: (hasGrommets) => {
    set({ hasGrommets });
    get().recalculatePrice();
  }
}));
