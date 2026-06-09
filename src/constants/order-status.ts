export const ORDER_STATUSES = [
  "pending_payment",
  "paid",
  "failed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
