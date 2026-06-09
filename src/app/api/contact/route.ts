import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@backend/lib/rate-limit";
import { saveContactSubmission } from "@backend/services/submission.service";
import { contactSchema } from "@/schemas/contact-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!rateLimit(`contact:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    await saveContactSubmission(parsed.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
