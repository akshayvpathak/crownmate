import { NextResponse } from "next/server";
import { requireAuth } from "@backend/lib/auth/get-auth-user";
import { getAdminBasePath } from "@/lib/admin-path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireAuth(request);
  if (user instanceof NextResponse) return user;

  const adminPath = user.role === "admin" ? `${getAdminBasePath()}/dashboard` : null;

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    emailVerified: user.emailVerified,
    adminPath,
  });
}
