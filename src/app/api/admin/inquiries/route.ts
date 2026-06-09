import { NextResponse } from "next/server";
import { requireAdmin } from "@backend/lib/auth/require-admin";
import { isMongoConfigured } from "@backend/lib/mongodb";
import { listContactInquiries } from "@backend/services/admin.service";
import { parseAdminPage } from "@/lib/admin-api";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Admin requires MONGODB_URI" }, { status: 503 });
  }

  const url = new URL(request.url);
  const { page, limit } = parseAdminPage(url.searchParams);
  const result = await listContactInquiries({
    page,
    limit,
    search: url.searchParams.get("search")?.trim(),
  });

  return NextResponse.json(result);
}
