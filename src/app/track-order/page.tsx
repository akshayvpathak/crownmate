"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderSchema, type TrackOrderFormData } from "@/schemas/contact-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TrackOrderPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackOrderFormData>({
    resolver: zodResolver(trackOrderSchema),
  });

  const onSubmit = async (_data: TrackOrderFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.info(
      "Order tracking is being processed. You will receive an update via email.",
    );
  };

  return (
    <div className="section-padding">
      <div className="container-frizty max-w-lg">
        <h1 className="mb-2 text-3xl font-bold">Track Your Order</h1>
        <p className="mb-8 text-muted-foreground">
          Enter your order ID and email to track your shipment.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register("orderId")} placeholder="Order ID" />
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
      </div>
    </div>
  );
}
