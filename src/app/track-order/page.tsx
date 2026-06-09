"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderSchema, type TrackOrderFormData } from "@/schemas/contact-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<{
    orderId: string;
    status: string;
    message: string;
  } | null>(null);

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
    setResult(null);
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
    setResult(json);
    toast.success("Order found");
  };

  return (
    <div className="section-padding">
      <div className="container-site max-w-lg">
        <h1 className="mb-2 text-3xl font-bold">Track Your Order</h1>
        <p className="mb-8 text-muted-foreground">
          Enter your order ID and the email you used at checkout.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("orderId")}
              placeholder="Order ID (e.g. CM-1234567890)"
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

        {result && (
          <div className="mt-6 rounded-xl border border-border p-4 text-sm">
            <p>
              <span className="text-muted-foreground">Order:</span>{" "}
              <strong>{result.orderId}</strong>
            </p>
            <p className="mt-2">
              <span className="text-muted-foreground">Status:</span>{" "}
              <strong className="capitalize">{result.status}</strong>
            </p>
            <p className="mt-2 text-muted-foreground">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
