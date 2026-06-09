import type { OrderStatus } from "@/constants/order-status";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: "Awaiting payment",
  paid: "Payment received",
  failed: "Payment failed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ORDER_STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  pending_payment: "Complete payment to confirm your order.",
  paid: "Payment confirmed. We're preparing your order.",
  failed: "Payment could not be completed. Contact support if you need help.",
  processing: "Your order is being packed and will ship soon.",
  shipped: "Your order is on the way.",
  delivered: "Your order has been delivered.",
  cancelled: "This order was cancelled.",
};

export const TRACKING_TIMELINE: OrderStatus[] = [
  "pending_payment",
  "paid",
  "processing",
  "shipped",
  "delivered",
];

export function getStatusLabel(status: OrderStatus | string): string {
  return ORDER_STATUS_LABELS[status as OrderStatus] ?? status.replaceAll("_", " ");
}

export function getStatusDescription(status: OrderStatus | string): string {
  return ORDER_STATUS_DESCRIPTIONS[status as OrderStatus] ?? "";
}

export function getTimelineIndex(status: OrderStatus | string): number {
  if (status === "failed" || status === "cancelled") return -1;
  const idx = TRACKING_TIMELINE.indexOf(status as OrderStatus);
  if (idx >= 0) return idx;
  if (status === "processing") return TRACKING_TIMELINE.indexOf("processing");
  return 0;
}

export function getPaymentMethodLabel(method: string): string {
  switch (method) {
    case "cod":
      return "Cash on Delivery";
    case "upi":
      return "UPI";
    case "card":
      return "Card";
    default:
      return method;
  }
}

export function isOrderActive(status: OrderStatus | string): boolean {
  return !["failed", "cancelled", "delivered"].includes(status);
}
