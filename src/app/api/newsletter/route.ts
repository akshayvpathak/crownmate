import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@backend/lib/rate-limit";
import { saveNewsletterSubscription } from "@backend/services/submission.service";
import { newsletterSchema } from "@/schemas/contact-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!rateLimit(`newsletter:${ip}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid email" },
        { status: 400 },
      );
    }
    await saveNewsletterSubscription(parsed.data.email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
