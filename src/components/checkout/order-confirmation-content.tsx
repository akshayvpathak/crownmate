"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { OrderSummary } from "@/components/order/order-summary";
import { WHATSAPP_URL } from "@/constants/assets";
import { Button } from "@/components/ui/button";
import type { OrderDetails } from "@/types";

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

  if (!orderId) {
    return (
      <div className="section-padding text-center">
        <p className="text-muted-foreground">No order ID provided.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const isConfirmed = order?.status === "confirmed";
  const isFailed = order?.status === "failed";

  return (
    <div className="section-padding">
      <div className="container-site mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          {isFailed ? (
            <XCircle className="mx-auto h-14 w-14 text-destructive" />
          ) : isConfirmed ? (
            <CheckCircle className="mx-auto h-14 w-14 text-success" />
          ) : (
            <Clock className="mx-auto h-14 w-14 text-primary" />
          )}
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            {isFailed
              ? "Order issue"
              : isConfirmed
                ? "Order placed!"
                : "Order received"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Order ID: <strong>{orderId}</strong>
          </p>
          {order?.message && (
            <p className="mt-2 text-sm text-muted-foreground">{order.message}</p>
          )}
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading order details…</p>
        ) : order ? (
          <OrderSummary order={order} />
        ) : (
          <div className="rounded-xl border border-border p-6 text-center text-sm text-muted-foreground">
            <p>We received your order. Save your order ID for tracking.</p>
            <p className="mt-2">
              Use the email you entered at checkout on the track order page.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href={`/track-order?orderId=${orderId}`}>Track Order</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp Support
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
