import { cn } from "@/lib/utils";
import {
  getStatusLabel,
  TRACKING_TIMELINE,
  getTimelineIndex,
} from "@/lib/order-status";
import type { OrderLifecycleStatus } from "@/types";

export function OrderStatusTimeline({
  status,
  className,
}: {
  status: OrderLifecycleStatus | string;
  className?: string;
}) {
  if (status === "failed" || status === "cancelled") {
    return (
      <div
        className={cn(
          "rounded-xl border border-destructive/30 bg-destructive/5 p-4",
          className,
        )}
      >
        <p className="text-sm font-medium text-destructive">{getStatusLabel(status)}</p>
      </div>
    );
  }

  const currentIndex = getTimelineIndex(status);

  return (
    <ol className={cn("space-y-0", className)}>
      {TRACKING_TIMELINE.map((step, index) => {
        const done = index <= currentIndex;
        const active = index === currentIndex;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {index + 1}
              </span>
              {index < TRACKING_TIMELINE.length - 1 && (
                <span
                  className={cn(
                    "my-1 w-0.5 flex-1 min-h-6",
                    done ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
            <div
              className={cn("pb-6", index === TRACKING_TIMELINE.length - 1 && "pb-0")}
            >
              <p
                className={cn(
                  "text-sm font-medium",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {getStatusLabel(step)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
