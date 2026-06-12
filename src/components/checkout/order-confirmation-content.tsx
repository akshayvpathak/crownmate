"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Clock3,
  Copy,
  MessageCircle,
  Package,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { OrderSummary } from "@/components/order/order-summary";
import { WHATSAPP_URL } from "@/constants/assets";
import { getDeliveryRangeText } from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import type { OrderDetails } from "@/types";

const PAID_STATUSES = new Set(["paid", "processing", "shipped", "delivered"]);
const FAILED_STATUSES = new Set(["failed", "cancelled"]);

function getLifecycleStatus(order: OrderDetails | null) {
  return order?.orderStatus ?? "pending_payment";
}

export function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const email = searchParams.get("email") ?? "";
  const getOrder = useOrderStore((s) => s.getOrder);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const local = getOrder(orderId);
    if (local) {
      setOrder(local);
      setLoading(false);
      return;
    }

    if (!email) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/orders/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, email }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as { order?: OrderDetails };
        if (!cancelled && data.order) setOrder(data.order);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [orderId, email, getOrder]);

  async function copyOrderId() {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      toast.success("Order ID copied");
    } catch {
      toast.error("Could not copy order ID");
    }
  }

  if (!orderId) {
    return (
      <div className="section-padding">
        <div className="container-site mx-auto max-w-lg text-center">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="mt-4 text-xl font-semibold">No order found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We couldn&apos;t find an order ID in this link.
            </p>
            <Button asChild className="mt-6">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const lifecycleStatus = getLifecycleStatus(order);
  const isPaid = PAID_STATUSES.has(lifecycleStatus);
  const isFailed = FAILED_STATUSES.has(lifecycleStatus);
  const isPendingPayment = lifecycleStatus === "pending_payment";

  const hero = isPaid
    ? {
        icon: CheckCircle2,
        title: "Thank you! Order confirmed",
        subtitle: order?.message ?? "Payment received. We're preparing your order.",
        ring: "bg-success/15 text-success",
        glow: "from-success/20 via-success/5 to-transparent",
        badge: "Payment successful",
        badgeClass: "bg-success/10 text-success",
      }
    : isFailed
      ? {
          icon: XCircle,
          title: "Order could not be completed",
          subtitle:
            order?.message ??
            "Something went wrong with this order. Contact support if you need help.",
          ring: "bg-destructive/15 text-destructive",
          glow: "from-destructive/20 via-destructive/5 to-transparent",
          badge: lifecycleStatus === "cancelled" ? "Cancelled" : "Payment failed",
          badgeClass: "bg-destructive/10 text-destructive",
        }
      : {
          icon: Clock3,
          title: "Payment pending",
          subtitle:
            order?.message ??
            "Complete payment to confirm your order. Until then, it won't be processed.",
          ring: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
          glow: "from-amber-500/20 via-amber-500/5 to-transparent",
          badge: "Awaiting payment",
          badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
        };

  const HeroIcon = hero.icon;

  return (
    <div className="section-padding">
      <div className="container-site mx-auto max-w-3xl">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10",
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-b",
              hero.glow,
            )}
          />
          <div className="relative">
            <div
              className={cn(
                "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
                hero.ring,
              )}
            >
              <HeroIcon className="h-8 w-8" strokeWidth={1.75} />
            </div>
            <span
              className={cn(
                "mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                hero.badgeClass,
              )}
            >
              {hero.badge}
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              {hero.title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              {hero.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <code className="rounded-lg border border-border bg-background/80 px-3 py-1.5 text-sm font-mono font-semibold text-primary">
                {orderId}
              </code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1.5"
                onClick={() => void copyOrderId()}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>

            {isPaid && (
              <p className="mt-4 text-sm text-muted-foreground">
                Estimated delivery: {getDeliveryRangeText()}
              </p>
            )}

            {isPendingPayment && (
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/checkout">Return to checkout</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/track-order?orderId=${orderId}`}>Track order</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-sm">
            Loading order details…
          </div>
        ) : order ? (
          <div className="mt-8 space-y-6">
            {isPaid && order.total > 0 && (
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Total paid
                  </p>
                  <p className="mt-1 text-xl font-bold">{formatPrice(order.total)}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Items
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {order.items.reduce((n, i) => n + i.quantity, 0)}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Payment
                  </p>
                  <p className="mt-1 text-xl font-bold capitalize">
                    {order.paymentMethod ?? "Online"}
                  </p>
                </div>
              </div>
            )}

            <OrderSummary order={order} />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">
              Save your order ID and use the email from checkout on the track order
              page.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!isPendingPayment && (
            <Button asChild>
              <Link href={`/track-order?orderId=${orderId}`}>Track order</Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp support
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
