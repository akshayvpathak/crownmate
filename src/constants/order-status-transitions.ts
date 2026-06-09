import type { OrderStatus } from "@/constants/order-status";

/** Allowed admin status changes from each current state. */
export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  pending_payment: ["paid", "failed", "cancelled"],
  paid: ["processing", "cancelled"],
  failed: ["pending_payment", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: ["cancelled"],
  cancelled: [],
};

export function getAllowedNextStatuses(current: OrderStatus | string): OrderStatus[] {
  const status = current as OrderStatus;
  const next = ORDER_STATUS_TRANSITIONS[status];
  if (!next) return [];
  return [status, ...next.filter((s) => s !== status)];
}

export function canTransitionTo(
  current: OrderStatus | string,
  next: OrderStatus | string,
): boolean {
  if (current === next) return true;
  const allowed = ORDER_STATUS_TRANSITIONS[current as OrderStatus];
  return allowed?.includes(next as OrderStatus) ?? false;
}
