import type { PaymentIntent, PaymentMethod } from "@/types";

export interface PaymentProvider {
  createPaymentIntent(
    amount: number,
    currency: string,
    orderId: string,
  ): Promise<PaymentIntent>;
  verifyPayment?(
    paymentId: string,
    orderId: string,
    signature: string,
  ): Promise<boolean>;
}

class CodPaymentProvider implements PaymentProvider {
  async createPaymentIntent(
    amount: number,
    currency: string,
    orderId: string,
  ): Promise<PaymentIntent> {
    return {
      orderId,
      amount,
      currency,
      provider: "cod",
      status: "confirmed",
    };
  }
}

class RazorpayPaymentProvider implements PaymentProvider {
  async createPaymentIntent(
    amount: number,
    currency: string,
    orderId: string,
  ): Promise<PaymentIntent> {
    // Stub: replace with Razorpay Orders API when keys are configured.
    return {
      orderId,
      amount,
      currency,
      provider: "razorpay",
      status: "pending",
      razorpayOrderId: `order_${orderId}`,
    };
  }

  async verifyPayment(
    paymentId: string,
    orderId: string,
    signature: string,
  ): Promise<boolean> {
    void paymentId;
    void orderId;
    void signature;
    // Stub: verify HMAC signature with Razorpay webhook secret.
    return false;
  }
}

const codProvider = new CodPaymentProvider();
const razorpayProvider = new RazorpayPaymentProvider();

export function getPaymentProvider(method: PaymentMethod): PaymentProvider {
  if (method === "cod") return codProvider;
  return razorpayProvider;
}

export async function createPaymentIntent(
  method: PaymentMethod,
  amount: number,
  orderId: string,
  currency = "INR",
): Promise<PaymentIntent> {
  return getPaymentProvider(method).createPaymentIntent(amount, currency, orderId);
}
