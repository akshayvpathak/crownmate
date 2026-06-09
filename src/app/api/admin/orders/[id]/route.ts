import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireAdmin } from "@backend/lib/auth/require-admin";
import { isMongoConfigured } from "@backend/lib/mongodb";
import {
  getOrderByIdForAdmin,
  updateOrderStatusById,
} from "@backend/services/admin.service";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Admin requires MONGODB_URI" }, { status: 503 });
  }

  const { id } = await context.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  const result = await getOrderByIdForAdmin(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ order: result.order });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Admin requires MONGODB_URI" }, { status: 503 });
  }

  const { id } = await context.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = typeof body.status === "string" ? body.status.trim() : "";
  const result = await updateOrderStatusById(id, status);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}
