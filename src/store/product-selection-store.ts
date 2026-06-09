import { create } from "zustand";

interface ProductSelectionState {
  selectedVariantId: string | null;
  selectedImageIndex: number;
  quantity: number;
  setSelectedVariant: (variantId: string) => void;
  setSelectedImageIndex: (index: number) => void;
  setQuantity: (quantity: number) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  reset: () => void;
}

export const useProductSelectionStore = create<ProductSelectionState>((set) => ({
  selectedVariantId: null,
  selectedImageIndex: 0,
  quantity: 1,

  setSelectedVariant: (variantId) => set({ selectedVariantId: variantId }),

  setSelectedImageIndex: (index) => set({ selectedImageIndex: index }),

  setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),

  incrementQuantity: () => set((s) => ({ quantity: s.quantity + 1 })),

  decrementQuantity: () => set((s) => ({ quantity: Math.max(1, s.quantity - 1) })),

  reset: () => set({ selectedVariantId: null, selectedImageIndex: 0, quantity: 1 }),
}));
