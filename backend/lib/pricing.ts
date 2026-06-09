import { SHIPPING_CONFIG } from "@/constants/assets";

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function paiseToRupees(paise: number): number {
  return paise / 100;
}

export function getTierDiscountPercent(subtotalRupees: number): number {
  if (subtotalRupees >= 2999) return 15;
  if (subtotalRupees >= 1450) return 10;
  if (subtotalRupees >= 799) return 5;
  return 0;
}

export interface OrderPricing {
  subtotalRupees: number;
  subtotalPaise: number;
  discountRupees: number;
  discountPaise: number;
  shippingRupees: number;
  shippingPaise: number;
  totalRupees: number;
  totalPaise: number;
  effectiveDiscountPercent: number;
}

export function calculateOrderPricing(
  subtotalRupees: number,
  couponDiscountPercent = 0,
): OrderPricing {
  const tierDiscount = getTierDiscountPercent(subtotalRupees);
  const effectiveDiscountPercent = Math.max(tierDiscount, couponDiscountPercent);
  const discountRupees = (subtotalRupees * effectiveDiscountPercent) / 100;
  const shippingRupees =
    subtotalRupees >= SHIPPING_CONFIG.freeThreshold ? 0 : SHIPPING_CONFIG.flatRate;
  const totalRupees = subtotalRupees - discountRupees + shippingRupees;

  return {
    subtotalRupees,
    subtotalPaise: rupeesToPaise(subtotalRupees),
    discountRupees,
    discountPaise: rupeesToPaise(discountRupees),
    shippingRupees,
    shippingPaise: rupeesToPaise(shippingRupees),
    totalRupees,
    totalPaise: rupeesToPaise(totalRupees),
    effectiveDiscountPercent,
  };
}
