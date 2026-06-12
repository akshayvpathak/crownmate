import { connectMongo } from "@backend/lib/mongodb";
import { CouponModel } from "@backend/models/Coupon";
import { OrderModel } from "@backend/models/Order";

const COUPON_USAGE_STATUSES = [
  "pending_payment",
  "paid",
  "processing",
  "shipped",
  "delivered",
] as const;

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function normalizeUsageLimit(limit: number | null | undefined): number | null {
  if (limit == null || limit <= 0) return null;
  return Math.floor(limit);
}

async function countCouponUses(code: string): Promise<number> {
  return OrderModel.countDocuments({
    couponCode: code,
    status: { $in: COUPON_USAGE_STATUSES },
  });
}

async function getCouponUsageCounts(): Promise<Map<string, number>> {
  const rows = await OrderModel.aggregate<{ _id: string; count: number }>([
    {
      $match: {
        couponCode: { $exists: true, $ne: null },
        status: { $in: COUPON_USAGE_STATUSES },
      },
    },
    { $group: { _id: "$couponCode", count: { $sum: 1 } } },
  ]);

  return new Map(rows.map((row) => [row._id, row.count]));
}

export async function validateCouponCode(code: string): Promise<{
  valid: boolean;
  code: string;
  discountPercent: number;
  error?: string;
}> {
  await connectMongo();
  const normalized = normalizeCode(code);
  const coupon = await CouponModel.findOne({ code: normalized, active: true }).lean();

  if (!coupon) {
    return {
      valid: false,
      code: normalized,
      discountPercent: 0,
      error: "Invalid coupon code",
    };
  }

  if (coupon.usageLimit != null) {
    const usageCount = await countCouponUses(coupon.code);
    if (usageCount >= coupon.usageLimit) {
      return {
        valid: false,
        code: normalized,
        discountPercent: 0,
        error: "This coupon has reached its usage limit",
      };
    }
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
  const usageCounts = await getCouponUsageCounts();

  return coupons.map((coupon) => ({
    id: coupon._id.toString(),
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    usageLimit: coupon.usageLimit ?? null,
    usageCount: usageCounts.get(coupon.code) ?? 0,
    active: coupon.active,
    createdAt: coupon.createdAt,
    updatedAt: coupon.updatedAt,
  }));
}

export async function listActiveCouponCodes() {
  await connectMongo();
  const coupons = await CouponModel.find({ active: true }).sort({ code: 1 }).lean();
  const usageCounts = await getCouponUsageCounts();

  return coupons
    .filter((coupon) => {
      if (coupon.usageLimit == null) return true;
      return (usageCounts.get(coupon.code) ?? 0) < coupon.usageLimit;
    })
    .map((coupon) => coupon.code);
}

export async function createCoupon(input: {
  code: string;
  discountPercent: number;
  usageLimit?: number | null;
  active?: boolean;
}) {
  const code = normalizeCode(input.code);
  if (!code || code.length < 2) {
    return { ok: false as const, error: "Coupon code is required" };
  }
  if (input.discountPercent < 1 || input.discountPercent > 100) {
    return { ok: false as const, error: "Discount must be between 1 and 100" };
  }

  const usageLimit = normalizeUsageLimit(input.usageLimit);
  if (usageLimit != null && usageLimit < 1) {
    return { ok: false as const, error: "Usage limit must be at least 1" };
  }

  await connectMongo();
  const existing = await CouponModel.findOne({ code }).lean();
  if (existing) {
    return { ok: false as const, error: "Coupon code already exists" };
  }

  const coupon = await CouponModel.create({
    code,
    discountPercent: Math.round(input.discountPercent),
    usageLimit,
    active: input.active ?? true,
  });

  return {
    ok: true as const,
    coupon: {
      id: coupon._id.toString(),
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      usageLimit: coupon.usageLimit ?? null,
      active: coupon.active,
    },
  };
}

export async function updateCouponById(
  id: string,
  input: Partial<{
    code: string;
    discountPercent: number;
    usageLimit: number | null;
    active: boolean;
  }>,
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

  if (input.usageLimit !== undefined) {
    const usageLimit = normalizeUsageLimit(input.usageLimit);
    if (usageLimit != null && usageLimit < 1) {
      return { ok: false as const, error: "Usage limit must be at least 1" };
    }
    coupon.usageLimit = usageLimit;
  }

  if (input.active !== undefined) coupon.active = input.active;

  await coupon.save();
  return {
    ok: true as const,
    coupon: {
      id: coupon._id.toString(),
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      usageLimit: coupon.usageLimit ?? null,
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
