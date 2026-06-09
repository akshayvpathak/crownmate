import { connectMongo } from "@backend/lib/mongodb";
import { CouponModel } from "@backend/models/Coupon";

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export async function validateCouponCode(code: string): Promise<{
  valid: boolean;
  code: string;
  discountPercent: number;
}> {
  await connectMongo();
  const normalized = normalizeCode(code);
  const coupon = await CouponModel.findOne({ code: normalized, active: true }).lean();

  if (!coupon) {
    return { valid: false, code: normalized, discountPercent: 0 };
  }

  return {
    valid: true,
    code: coupon.code,
    discountPercent: coupon.discountPercent,
  };
}

export async function listCouponsForAdmin() {
  await connectMongo();
  const coupons = await CouponModel.find().sort({ code: 1 }).lean();
  return coupons.map((coupon) => ({
    id: coupon._id.toString(),
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    active: coupon.active,
    createdAt: coupon.createdAt,
    updatedAt: coupon.updatedAt,
  }));
}

export async function listActiveCouponCodes() {
  await connectMongo();
  const coupons = await CouponModel.find({ active: true }).sort({ code: 1 }).lean();
  return coupons.map((coupon) => coupon.code);
}

export async function createCoupon(input: {
  code: string;
  discountPercent: number;
  active?: boolean;
}) {
  const code = normalizeCode(input.code);
  if (!code || code.length < 2) {
    return { ok: false as const, error: "Coupon code is required" };
  }
  if (input.discountPercent < 1 || input.discountPercent > 100) {
    return { ok: false as const, error: "Discount must be between 1 and 100" };
  }

  await connectMongo();
  const existing = await CouponModel.findOne({ code }).lean();
  if (existing) {
    return { ok: false as const, error: "Coupon code already exists" };
  }

  const coupon = await CouponModel.create({
    code,
    discountPercent: Math.round(input.discountPercent),
    active: input.active ?? true,
  });

  return {
    ok: true as const,
    coupon: {
      id: coupon._id.toString(),
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      active: coupon.active,
    },
  };
}

export async function updateCouponById(
  id: string,
  input: Partial<{ code: string; discountPercent: number; active: boolean }>,
) {
  await connectMongo();
  const coupon = await CouponModel.findById(id);
  if (!coupon) return { ok: false as const, error: "Coupon not found" };

  if (input.code !== undefined) {
    const nextCode = normalizeCode(input.code);
    if (!nextCode || nextCode.length < 2) {
      return { ok: false as const, error: "Coupon code is required" };
    }
    const duplicate = await CouponModel.findOne({
      code: nextCode,
      _id: { $ne: id },
    }).lean();
    if (duplicate) return { ok: false as const, error: "Coupon code already exists" };
    coupon.code = nextCode;
  }

  if (input.discountPercent !== undefined) {
    if (input.discountPercent < 1 || input.discountPercent > 100) {
      return { ok: false as const, error: "Discount must be between 1 and 100" };
    }
    coupon.discountPercent = Math.round(input.discountPercent);
  }

  if (input.active !== undefined) coupon.active = input.active;

  await coupon.save();
  return {
    ok: true as const,
    coupon: {
      id: coupon._id.toString(),
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      active: coupon.active,
    },
  };
}

export async function deleteCouponById(id: string) {
  await connectMongo();
  const deleted = await CouponModel.findByIdAndDelete(id);
  if (!deleted) return { ok: false as const, error: "Coupon not found" };
  return { ok: true as const };
}
