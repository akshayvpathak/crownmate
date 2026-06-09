"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";
import { getDeliveryRangeText } from "@/lib/shipping";
import { WHATSAPP_URL } from "@/constants/assets";
import { Button } from "@/components/ui/button";
import type { CheckoutOrder } from "@/types";

export function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const getOrder = useOrderStore((s) => s.getOrder);
  const [order, setOrder] = useState<CheckoutOrder | null>(null);

  useEffect(() => {
    if (orderId) setOrder(getOrder(orderId) ?? null);
  }, [orderId, getOrder]);

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

  return (
    <div className="section-padding">
      <div className="container-site mx-auto max-w-lg text-center">
        {isConfirmed ? (
          <CheckCircle className="mx-auto h-14 w-14 text-success" />
        ) : (
          <Clock className="mx-auto h-14 w-14 text-primary" />
        )}
        <h1 className="mt-4 text-2xl font-bold md:text-3xl">
          {isConfirmed ? "Order placed!" : "Order received"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Order ID: <strong>{orderId}</strong>
        </p>

        {order ? (
          <div className="mt-6 rounded-xl border border-border p-4 text-left text-sm">
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              <strong className="capitalize">{order.status}</strong>
            </p>
            <p className="mt-2">
              <span className="text-muted-foreground">Total:</span>{" "}
              <strong>{formatPrice(order.total)}</strong>
            </p>
            <p className="mt-2">
              <span className="text-muted-foreground">Delivery:</span>{" "}
              {getDeliveryRangeText()} to {order.customer.pincode}
            </p>
            {!isConfirmed && (
              <p className="mt-3 text-muted-foreground">
                Razorpay integration is pending. Your order is saved — contact us on
                WhatsApp to complete payment.
              </p>
            )}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            We received your order. Save your order ID for tracking.
          </p>
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
        </div>
      </div>
    </div>
  );
}
