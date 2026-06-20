import { connectMongo } from "@backend/lib/mongodb";
import { SEED_COUPONS } from "@backend/lib/seed-data";
import { CouponModel } from "@backend/models/Coupon";

let seeded = false;

export async function ensureDatabaseSeeded(): Promise<void> {
  if (seeded) return;
  await connectMongo();

  // Only seed coupons if database is completely empty (first-time setup)
  const hasAnyData = await CouponModel.findOne({});
  if (!hasAnyData) {
    await CouponModel.insertMany(SEED_COUPONS);
  }

  seeded = true;
}
