import { NextResponse } from "next/server";
import { getProductsCatalogSummary } from "@backend/lib/catalog";
import { requireAdmin } from "@backend/lib/auth/require-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const products = await getProductsCatalogSummary();
  return NextResponse.json({ products });
}
