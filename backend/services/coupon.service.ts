import { validateCouponCode } from "@backend/services/coupon-db.service";

export async function applyCoupon(code: string) {
  const result = await validateCouponCode(code);
  if (!result.valid) {
    return { ok: false as const, error: result.error ?? "Invalid coupon code" };
  }

  return {
    ok: true as const,
    code: result.code,
    discountPercent: result.discountPercent,
  };
}
