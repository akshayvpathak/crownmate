import { NextResponse } from "next/server";
import { createCoupon, listCouponsForAdmin } from "@backend/lib/coupons";
import { requireAdmin } from "@backend/lib/auth/require-admin";
import { isMongoConfigured } from "@backend/lib/mongodb";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "MONGODB_URI is required" }, { status: 503 });
  }

  const coupons = await listCouponsForAdmin();
  return NextResponse.json({ coupons });
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "MONGODB_URI is required" }, { status: 503 });
  }

  let body: { code?: string; discountPercent?: number; active?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.code || body.discountPercent === undefined) {
    return NextResponse.json(
      { error: "Code and discount are required" },
      { status: 400 },
    );
  }

  const result = await createCoupon({
    code: body.code,
    discountPercent: body.discountPercent,
    active: body.active,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ coupon: result.coupon }, { status: 201 });
}
