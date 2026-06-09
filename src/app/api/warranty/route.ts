import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@backend/lib/rate-limit";
import { saveWarrantyRegistration } from "@backend/services/submission.service";
import { warrantySchema } from "@/schemas/contact-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!rateLimit(`warranty:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = warrantySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    await saveWarrantyRegistration(parsed.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to register warranty" }, { status: 500 });
  }
}
