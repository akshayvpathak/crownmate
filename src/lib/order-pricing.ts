import { calculateOrderPricing as calculateBackendPricing } from "@backend/lib/pricing";

export interface OrderPricing {
  subtotal: number;
  shipping: number;
  total: number;
}

export function calculateOrderPricing(subtotal: number): OrderPricing {
  const pricing = calculateBackendPricing(subtotal);
  return {
    subtotal: pricing.subtotalRupees,
    shipping: pricing.shippingRupees,
    total: pricing.totalRupees,
  };
}
