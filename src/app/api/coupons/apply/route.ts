import { NextResponse } from "next/server";
import { z } from "zod";
import { applyCoupon } from "@backend/services/coupon.service";

export const runtime = "nodejs";

const applyCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = applyCouponSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    const result = await applyCoupon(parsed.data.code);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      code: result.code,
      discountPercent: result.discountPercent,
    });
  } catch {
    return NextResponse.json({ error: "Failed to validate coupon" }, { status: 500 });
  }
}
