import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { DISCOUNT_TIERS } from "@/constants/assets";
import { calculateOrderPricing } from "@/lib/order-pricing";
import { getShippingCost } from "@/lib/shipping";

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getNextDiscountTier: () => (typeof DISCOUNT_TIERS)[number] | null;
  getAmountToNextTier: () => number;
}

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

      applyCoupon: async (code) => {
        try {
          const response = await fetch("/api/coupons/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });
          if (!response.ok) return false;
          const data = (await response.json()) as {
            code: string;
            discountPercent: number;
          };
          set({
            couponCode: data.code,
            couponDiscount: data.discountPercent,
          });
          return true;
        } catch {
          return false;
        }
      },

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const { couponDiscount } = get();
        return calculateOrderPricing(subtotal, couponDiscount).discount;
      },

      getShipping: () => getShippingCost(get().getSubtotal()),

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const { couponDiscount } = get();
        return calculateOrderPricing(subtotal, couponDiscount).total;
      },

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
    { name: "crownmate-cart" },
  ),
);
