"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { warrantySchema, type WarrantyFormData } from "@/schemas/contact-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function WarrantyRegistrationPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WarrantyFormData>({
    resolver: zodResolver(warrantySchema),
  });

  const onSubmit = async (_data: WarrantyFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Warranty registered successfully!");
    reset();
  };

  return (
    <div className="section-padding">
      <div className="container-frizty max-w-lg">
        <h1 className="mb-2 text-3xl font-bold">Warranty Registration</h1>
        <p className="mb-8 text-muted-foreground">
          Register your CrownMate product to activate your 1-year warranty.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("name")} placeholder="Full Name" />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
          <Input {...register("email")} type="email" placeholder="Email" />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
          <Input {...register("phone")} type="tel" placeholder="Phone" />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
          <Input {...register("productName")} placeholder="Product Name" />
          {errors.productName && (
            <p className="text-sm text-destructive">{errors.productName.message}</p>
          )}
          <Input {...register("orderId")} placeholder="Order ID" />
          {errors.orderId && (
            <p className="text-sm text-destructive">{errors.orderId.message}</p>
          )}
          <Input
            {...register("purchaseDate")}
            type="date"
            placeholder="Purchase Date"
          />
          {errors.purchaseDate && (
            <p className="text-sm text-destructive">{errors.purchaseDate.message}</p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Warranty"}
          </Button>
        </form>
      </div>
    </div>
  );
}
