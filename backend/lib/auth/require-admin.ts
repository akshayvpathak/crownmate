import { NextResponse } from "next/server";
import { requireAuth, type AuthUser } from "@backend/lib/auth/get-auth-user";

export async function requireAdmin(request: Request): Promise<AuthUser | NextResponse> {
  const user = await requireAuth(request);
  if (user instanceof NextResponse) return user;
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return user;
}
