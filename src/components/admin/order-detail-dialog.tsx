"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderSummary } from "@/components/order/order-summary";
import type { OrderDetails } from "@/types";

export function OrderDetailDialog({
  order,
  open,
  onOpenChange,
  loading = false,
}: {
  order: OrderDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {order ? `Order ${order.orderId}` : "Order details"}
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading order…
          </p>
        ) : order ? (
          <OrderSummary order={order} />
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Order not found.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
