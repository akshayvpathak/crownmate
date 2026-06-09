import type { CheckoutFormData } from "@/schemas/contact-schema";
import type { CartItem, CheckoutOrder } from "@/types";
import { createPaymentIntent } from "@/services/payment-service";

function generateOrderId(): string {
  return `CM-${Date.now()}`;
}

export async function processCheckout(
  formData: CheckoutFormData,
  items: CartItem[],
  total: number,
): Promise<CheckoutOrder> {
  const orderId = generateOrderId();
  const paymentIntent = await createPaymentIntent(
    formData.paymentMethod,
    total,
    orderId,
  );

  const isCod = formData.paymentMethod === "cod";

  return {
    orderId,
    status: isCod ? "confirmed" : "pending",
    items,
    customer: {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    },
    total,
    paymentIntent,
    message: isCod
      ? "Order placed successfully!"
      : "Complete payment via Razorpay to confirm your order.",
  };
}
