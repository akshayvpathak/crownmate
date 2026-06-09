"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderSchema, type TrackOrderFormData } from "@/schemas/contact-schema";
import { OrderSummary } from "@/components/order/order-summary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { OrderDetails } from "@/types";

function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackOrderFormData>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderId: searchParams.get("orderId") ?? "",
      email: "",
    },
  });

  const onSubmit = async (data: TrackOrderFormData) => {
    setOrder(null);
    const res = await fetch("/api/orders/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      toast.error(json.error ?? "Order not found");
      return;
    }
    setOrder(json.order as OrderDetails);
    toast.success("Order found");
  };

  return (
    <div className="section-padding">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">Track Your Order</h1>
        <p className="mb-8 text-muted-foreground">
          Enter your order ID and the email you used at checkout.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 max-w-lg space-y-4">
          <div>
            <Input
              {...register("orderId")}
              placeholder="Order ID (e.g. CM-20250609-ABC123)"
            />
            {errors.orderId && (
              <p className="mt-1 text-sm text-destructive">{errors.orderId.message}</p>
            )}
          </div>
          <div>
            <Input {...register("email")} type="email" placeholder="Email" />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Tracking..." : "Track Order"}
          </Button>
        </form>

        {order && <OrderSummary order={order} />}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="section-padding text-center">Loading…</div>}>
      <TrackOrderForm />
    </Suspense>
  );
}
