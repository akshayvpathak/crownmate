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
import { openRazorpayCheckout } from "@/lib/razorpay-client";
import { SITE_CONFIG } from "@/constants/assets";
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
import type { CheckoutOrder } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const couponCode = useCartStore((s) => s.couponCode);
  const getTotal = useCartStore((s) => s.getTotal);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
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
    defaultValues: { paymentMethod: "upi" },
  });

  const completeOrder = (order: CheckoutOrder) => {
    addOrder(order);
    clearCart();
    router.push(
      `/order-confirmation?orderId=${order.orderId}&email=${encodeURIComponent(order.customer.email)}`,
    );
  };

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: data,
          items,
          couponCode,
        }),
      });

      const payload = (await response.json()) as {
        order?: CheckoutOrder;
        razorpayKeyId?: string;
        error?: string;
      };

      if (!response.ok || !payload.order) {
        toast.error(payload.error ?? "Checkout failed");
        return;
      }

      const order = payload.order;
      const canPayOnline =
        payload.razorpayKeyId &&
        order.paymentIntent.razorpayOrderId &&
        !order.paymentIntent.razorpayOrderId.startsWith("order_CM-");

      if (!canPayOnline) {
        completeOrder(order);
        return;
      }

      let paymentHandled = false;

      await openRazorpayCheckout({
        key: payload.razorpayKeyId!,
        amount: Math.round(order.total * 100),
        currency: "INR",
        order_id: order.paymentIntent.razorpayOrderId!,
        name: SITE_CONFIG.name,
        description: `Order ${order.orderId}`,
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        handler: async (paymentResponse) => {
          paymentHandled = true;
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: order.orderId,
              razorpayOrderId: paymentResponse.razorpay_order_id,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpaySignature: paymentResponse.razorpay_signature,
            }),
          });

          const verifyPayload = (await verifyResponse.json()) as {
            order?: CheckoutOrder;
            error?: string;
          };

          if (!verifyResponse.ok) {
            toast.error(verifyPayload.error ?? "Payment verification failed");
            return;
          }

          completeOrder(verifyPayload.order ?? { ...order, status: "confirmed" });
        },
        modal: {
          ondismiss: () => {
            if (paymentHandled) return;
            toast.error("Payment cancelled. No order was placed — you can try again.");
          },
        },
      });
    } catch {
      toast.error("Checkout failed. Please try again.");
    }
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
                defaultValue="upi"
                onValueChange={(v) =>
                  setValue("paymentMethod", v as CheckoutFormData["paymentMethod"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
                  <span>Discount{couponCode ? ` (${couponCode})` : ""}</span>
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
            <p className="mt-3 text-xs text-muted-foreground">
              Final price is calculated on our server. Razorpay only receives the
              discounted total.
            </p>
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
