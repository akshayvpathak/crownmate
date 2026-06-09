import { getStatusLabel } from "@/lib/order-status";
import { getOrderStatusStyle } from "@/lib/admin-status";
import { cn } from "@/lib/utils";

export function OrderStatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
        getOrderStatusStyle(status),
        className,
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}
