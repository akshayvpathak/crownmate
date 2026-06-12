import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
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
  applyCoupon: (code: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
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
          const data = (await response.json()) as {
            code?: string;
            discountPercent?: number;
            error?: string;
          };
          if (!response.ok) {
            return {
              ok: false,
              error: data.error ?? "Invalid coupon code",
            };
          }
          set({
            couponCode: data.code!,
            couponDiscount: data.discountPercent!,
          });
          return { ok: true };
        } catch {
          return { ok: false, error: "Could not validate coupon" };
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
    }),
    { name: "crownmate-cart" },
  ),
);
