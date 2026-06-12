"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { getStatusLabel, getPaymentMethodLabel } from "@/lib/order-status";
import { OrderStatusTimeline } from "@/components/order/order-status-timeline";
import { fetchWithSessionRefresh } from "@/lib/session-refresh";
import type { OrderLifecycleStatus } from "@/types";

type OrderRow = {
  id: string;
  orderNumber: string;
  status: OrderLifecycleStatus;
  amountPaise: number;
  currency: string;
  paymentMethod: string;
  couponCode?: string | null;
  createdAt: string;
  items: {
    name: string;
    variantTitle: string;
    quantity: number;
    unitPricePaise: number;
    image?: string;
  }[];
  customerName: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
};

export default function AccountOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetchWithSessionRefresh("/api/me/orders");
      if (cancelled) return;
      if (res.status === 401) {
        router.replace("/login?next=/account/orders");
        return;
      }
      const data = (await res.json()) as { orders?: OrderRow[]; error?: string };
      if (!res.ok) {
        setError(data.error || "Could not load orders");
        setOrders([]);
        return;
      }
      setOrders(data.orders ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="section-padding">
      <div className="container-site mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Your orders</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Orders placed while signed in are linked to your account.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/products">Shop</Link>
            </Button>
            <Button variant="ghost" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>

        {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

        {orders === null ? (
          <p className="mt-10 text-muted-foreground">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="mt-10 rounded-xl border border-border p-8 text-center text-muted-foreground">
            No orders yet.{" "}
            <Link href="/products" className="font-medium text-primary hover:underline">
              Browse products
            </Link>
          </p>
        ) : (
          <ul className="mt-10 space-y-6">
            {orders.map((o) => {
              const expanded = expandedId === o.id;
              return (
                <li key={o.id} className="rounded-xl border border-border p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {o.orderNumber}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(o.createdAt).toLocaleString("en-IN")} ·{" "}
                        {o.shippingCity}, {o.shippingState} {o.shippingPincode}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {getPaymentMethodLabel(o.paymentMethod)}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {getStatusLabel(o.status)}
                    </span>
                  </div>

                  <p className="mt-3 text-lg font-bold">
                    {formatPrice(o.amountPaise / 100)} {o.currency}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                    {o.items.map((item) => (
                      <li
                        key={`${o.id}-${item.name}-${item.variantTitle}`}
                        className="flex justify-between gap-4"
                      >
                        <span>
                          {item.name} ({item.variantTitle}) × {item.quantity}
                        </span>
                        <span className="shrink-0">
                          {formatPrice((item.unitPricePaise * item.quantity) / 100)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedId(expanded ? null : o.id)}
                    >
                      {expanded ? "Hide tracking" : "View tracking"}
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/order-confirmation?orderId=${o.orderNumber}`}>
                        Full details
                      </Link>
                    </Button>
                  </div>

                  {expanded && (
                    <div className="mt-4 border-t border-border pt-4">
                      <OrderStatusTimeline status={o.status} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
