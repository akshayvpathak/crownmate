import { SHIPPING_CONFIG } from "@/constants/assets";

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function paiseToRupees(paise: number): number {
  return paise / 100;
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
}

export function calculateOrderPricing(subtotalRupees: number): OrderPricing {
  const shippingRupees =
    subtotalRupees >= SHIPPING_CONFIG.freeThreshold ? 0 : SHIPPING_CONFIG.flatRate;
  const totalRupees = subtotalRupees + shippingRupees;

  return {
    subtotalRupees,
    subtotalPaise: rupeesToPaise(subtotalRupees),
    discountRupees: 0,
    discountPaise: 0,
    shippingRupees,
    shippingPaise: rupeesToPaise(shippingRupees),
    totalRupees,
    totalPaise: rupeesToPaise(totalRupees),
  };
}
