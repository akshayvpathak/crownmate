"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "@/schemas/contact-schema";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";
import { getShippingLabel } from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { processCheckout } from "@/services/checkout-service";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getShipping = useCartStore((s) => s.getShipping);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);

  const subtotal = getSubtotal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    const total = getTotal();
    const order = await processCheckout(data, items, total);

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch {
      toast.error("Order saved locally but server sync failed.");
    }

    addOrder(order);
    clearCart();
    router.push(`/order-confirmation?orderId=${order.orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-site text-center">
          <h1 className="mb-4 text-2xl font-bold">No items to checkout</h1>
          <Button asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-site">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Input {...register("email")} type="email" placeholder="Email" />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Input {...register("firstName")} placeholder="First name" />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input {...register("lastName")} placeholder="Last name" />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Input {...register("phone")} type="tel" placeholder="Phone" />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <Input {...register("address")} placeholder="Address" />
                  {errors.address && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Input {...register("city")} placeholder="City" />
                    {errors.city && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input {...register("state")} placeholder="State" />
                    {errors.state && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Input {...register("pincode")} placeholder="Pincode" />
                  {errors.pincode && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>
              <Select
                defaultValue="cod"
                onValueChange={(v) =>
                  setValue("paymentMethod", v as CheckoutFormData["paymentMethod"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                  <SelectItem value="upi">UPI (Razorpay)</SelectItem>
                  <SelectItem value="card">Credit/Debit Card (Razorpay)</SelectItem>
                </SelectContent>
              </Select>
            </section>
          </div>

          <div className="h-fit rounded-xl border border-border p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <ul className="mb-4 space-y-2 text-sm">
              {items.map((item) => (
                <li key={item.variantId} className="flex justify-between">
                  <span className="line-clamp-1 flex-1 pr-2">
                    {item.title} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              {getDiscount() > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-{formatPrice(getDiscount())}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{getShippingLabel(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
            <Button
              type="submit"
              className="mt-6 w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
