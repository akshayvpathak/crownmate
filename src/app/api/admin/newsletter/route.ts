import { NextResponse } from "next/server";
import { requireAdmin } from "@backend/lib/auth/require-admin";
import { isMongoConfigured } from "@backend/lib/mongodb";
import {
  deleteNewsletterSubscriber,
  listNewsletterSubscribers,
} from "@backend/services/admin.service";
import { parseAdminPage } from "@/lib/admin-api";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Admin requires MONGODB_URI" }, { status: 503 });
  }

  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim();

  if (url.searchParams.get("export") === "all") {
    const result = await listNewsletterSubscribers({
      page: 1,
      limit: 10000,
      search,
    });
    return NextResponse.json({ subscribers: result.subscribers, total: result.total });
  }

  const { page, limit } = parseAdminPage(url.searchParams);
  const result = await listNewsletterSubscribers({ page, limit, search });

  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Admin requires MONGODB_URI" }, { status: 503 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json({ error: "Missing subscriber id" }, { status: 400 });
  }

  const result = await deleteNewsletterSubscriber(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
