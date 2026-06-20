import { NextResponse } from "next/server";
import { requireAuth } from "@backend/lib/auth/get-auth-user";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cookies = request.headers.get("cookie");

    console.log("[DEBUG] Auth Debug Endpoint Called");
    console.log("[DEBUG] Authorization header:", authHeader ? "Present" : "Missing");
    console.log("[DEBUG] Cookies:", cookies ? `${cookies.length} bytes` : "None");

    const user = await requireAuth(request);

    if (user instanceof NextResponse) {
      console.log("[DEBUG] requireAuth returned NextResponse (auth failed)");
      return NextResponse.json(
        {
          authenticated: false,
          message: "Not authenticated",
        },
        { status: 401 },
      );
    }

    console.log("[DEBUG] User authenticated:", {
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isAdmin: user.role === "admin",
      },
    });
  } catch (error) {
    console.error("[DEBUG] Error in auth check:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
