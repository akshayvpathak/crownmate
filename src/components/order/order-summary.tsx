import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { getDeliveryRangeText } from "@/lib/shipping";
import {
  getPaymentMethodLabel,
  getStatusDescription,
  getStatusLabel,
} from "@/lib/order-status";
import { OrderStatusTimeline } from "@/components/order/order-status-timeline";
import type { OrderDetails } from "@/types";

export function OrderSummary({ order }: { order: OrderDetails }) {
  const lifecycleStatus = order.orderStatus ?? "pending_payment";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {order.orderId}
            </p>
            {order.createdAt && (
              <p className="mt-1 text-sm text-muted-foreground">
                Placed {new Date(order.createdAt).toLocaleString("en-IN")}
              </p>
            )}
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
            {getStatusLabel(lifecycleStatus)}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {getStatusDescription(lifecycleStatus)}
        </p>
        {order.paymentMethod && (
          <p className="mt-2 text-sm">
            <span className="text-muted-foreground">Payment:</span>{" "}
            {getPaymentMethodLabel(order.paymentMethod)}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-border p-4 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Tracking
        </h2>
        <OrderStatusTimeline status={lifecycleStatus} />
      </div>

      <div className="rounded-xl border border-border p-4 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Items
        </h2>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li key={`${item.variantId}-${item.quantity}`} className="flex gap-3">
              {item.image && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="line-clamp-1 font-medium hover:text-primary"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                <p className="mt-1 text-sm">
                  {formatPrice(item.price)} × {item.quantity}
                </p>
              </div>
              <p className="shrink-0 text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border p-4 sm:p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Shipping
          </h2>
          <p className="text-sm">
            {order.customer.firstName} {order.customer.lastName}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{order.customer.address}</p>
          <p className="text-sm text-muted-foreground">
            {order.customer.city}, {order.customer.state} {order.customer.pincode}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{order.customer.phone}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Estimated delivery: {getDeliveryRangeText()}
          </p>
        </div>

        <div className="rounded-xl border border-border p-4 sm:p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>
                  Discount
                  {order.couponCode ? ` (${order.couponCode})` : ""}
                </span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
