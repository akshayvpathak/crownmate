import { SHIPPING_CONFIG } from "@/constants/assets";

export function getShippingCost(subtotal: number): number {
  return subtotal >= SHIPPING_CONFIG.freeThreshold ? 0 : SHIPPING_CONFIG.flatRate;
}

export function getShippingLabel(subtotal: number): string {
  const { deliveryDaysMin, deliveryDaysMax, freeThreshold, flatRate } = SHIPPING_CONFIG;
  const days = `${deliveryDaysMin}–${deliveryDaysMax} days`;
  if (subtotal >= freeThreshold) return `Free (${days})`;
  return `₹${flatRate} (${days})`;
}

export function getDeliveryRangeText(): string {
  const { deliveryDaysMin, deliveryDaysMax } = SHIPPING_CONFIG;
  return `${deliveryDaysMin}–${deliveryDaysMax} working days`;
}
