import { NextResponse } from "next/server";
import { requireAdmin } from "@backend/lib/auth/require-admin";
import { isMongoConfigured } from "@backend/lib/mongodb";
import { getAdminStats } from "@backend/services/admin.service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Admin requires MONGODB_URI" }, { status: 503 });
  }

  try {
    const stats = await getAdminStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
