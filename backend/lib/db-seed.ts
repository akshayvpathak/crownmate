import { connectMongo } from "@backend/lib/mongodb";
import { SEED_COUPONS } from "@backend/lib/seed-data";
import { CouponModel } from "@backend/models/Coupon";

let seeded = false;

export async function ensureDatabaseSeeded(): Promise<void> {
  if (seeded) return;
  await connectMongo();

  const couponCount = await CouponModel.countDocuments();
  if (couponCount === 0) {
    await CouponModel.insertMany(SEED_COUPONS);
  }

  seeded = true;
}
