import { NextResponse } from "next/server";
import { requireAdmin } from "@backend/lib/auth/require-admin";
import { isMongoConfigured } from "@backend/lib/mongodb";
import { listOrders } from "@backend/services/admin.service";

export const runtime = "nodejs";

function parsePage(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20),
  );
  return { page, limit };
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Admin requires MONGODB_URI" }, { status: 503 });
  }

  const url = new URL(request.url);
  const { page, limit } = parsePage(url.searchParams);
  const result = await listOrders({
    page,
    limit,
    status: url.searchParams.get("status")?.trim(),
    email: url.searchParams.get("email")?.trim(),
    orderNumber: url.searchParams.get("orderNumber")?.trim(),
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}
