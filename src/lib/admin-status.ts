import type { OrderStatus } from "@/constants/order-status";

export const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  pending_payment: "bg-amber-100 text-amber-800 border-amber-200",
  paid: "bg-blue-100 text-blue-800 border-blue-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  processing: "bg-violet-100 text-violet-800 border-violet-200",
  shipped: "bg-cyan-100 text-cyan-800 border-cyan-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

export function getOrderStatusStyle(status: string): string {
  return (
    ORDER_STATUS_STYLES[status as OrderStatus] ??
    "bg-muted text-muted-foreground border-border"
  );
}
