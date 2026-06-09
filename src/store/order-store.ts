import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CheckoutOrder } from "@/types";

interface OrderState {
  orders: CheckoutOrder[];
  addOrder: (order: CheckoutOrder) => void;
  getOrder: (orderId: string) => CheckoutOrder | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [
            order,
            ...state.orders.filter((o) => o.orderId !== order.orderId),
          ].slice(0, 20),
        })),
      getOrder: (orderId) =>
        get().orders.find((o) => o.orderId.toLowerCase() === orderId.toLowerCase()),
    }),
    { name: "crownmate-orders" },
  ),
);
