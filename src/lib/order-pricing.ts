import { calculateOrderPricing as calculateBackendPricing } from "@backend/lib/pricing";

export interface OrderPricing {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  effectiveDiscountPercent: number;
}

export function calculateOrderPricing(
  subtotal: number,
  couponDiscountPercent = 0,
): OrderPricing {
  const pricing = calculateBackendPricing(subtotal, couponDiscountPercent);
  return {
    subtotal: pricing.subtotalRupees,
    discount: pricing.discountRupees,
    shipping: pricing.shippingRupees,
    total: pricing.totalRupees,
    effectiveDiscountPercent: pricing.effectiveDiscountPercent,
  };
}
