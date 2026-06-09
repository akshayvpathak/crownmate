import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { DISCOUNT_TIERS } from "@/constants/assets";

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getNextDiscountTier: () => (typeof DISCOUNT_TIERS)[number] | null;
  getAmountToNextTier: () => number;
}

const VALID_COUPONS: Record<string, number> = {
  FRIZTY5: 5,
  FRIZTY10: 10,
  WELCOME: 5,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,

      addItem: (item) => {
        const quantity = item.quantity ?? 1;
        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),

      applyCoupon: (code) => {
        const discount = VALID_COUPONS[code.toUpperCase()];
        if (!discount) return false;
        set({ couponCode: code.toUpperCase(), couponDiscount: discount });
        return true;
      },

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const { couponDiscount } = get();
        let tierDiscount = 0;
        if (subtotal >= 3099) tierDiscount = 15;
        else if (subtotal >= 2099) tierDiscount = 10;
        else if (subtotal >= 1099) tierDiscount = 5;
        const effective = Math.max(tierDiscount, couponDiscount);
        return (subtotal * effective) / 100;
      },

      getTotal: () => get().getSubtotal() - get().getDiscount(),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getNextDiscountTier: () => {
        const subtotal = get().getSubtotal();
        for (const tier of DISCOUNT_TIERS) {
          if (subtotal < tier.threshold) return tier;
        }
        return null;
      },

      getAmountToNextTier: () => {
        const tier = get().getNextDiscountTier();
        if (!tier) return 0;
        return tier.threshold - get().getSubtotal();
      },
    }),
    { name: "frizty-cart" },
  ),
);
