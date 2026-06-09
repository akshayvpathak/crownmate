import type { OrderStatus } from "@/constants/order-status";

export function createInitialStatusHistory(
  status: OrderStatus,
  note?: string,
): Array<{ status: OrderStatus; at: Date; note?: string }> {
  return [{ status, at: new Date(), note }];
}

export function appendStatusHistory(
  existing: Array<{ status: OrderStatus; at: Date; note?: string }> | undefined,
  status: OrderStatus,
  note?: string,
): Array<{ status: OrderStatus; at: Date; note?: string }> {
  const history = existing ? [...existing] : [];
  const last = history[history.length - 1];
  if (last?.status === status) return history;
  history.push({ status, at: new Date(), note });
  return history;
}

export function getStatusTimestampUpdates(
  status: OrderStatus,
): Partial<{ paidAt: Date; shippedAt: Date; deliveredAt: Date }> {
  const now = new Date();
  switch (status) {
    case "paid":
      return { paidAt: now };
    case "shipped":
      return { shippedAt: now };
    case "delivered":
      return { deliveredAt: now };
    default:
      return {};
  }
}
