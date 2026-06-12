import { NextResponse } from "next/server";
import { listActiveCouponCodes } from "@backend/lib/coupons";
import { isMongoConfigured } from "@backend/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  if (!isMongoConfigured()) {
    return NextResponse.json({ codes: [] });
  }

  try {
    const codes = await listActiveCouponCodes();
    return NextResponse.json({ codes });
  } catch {
    return NextResponse.json({ codes: [] });
  }
}
