import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/submission-storage";
import { warrantySchema } from "@/schemas/contact-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = warrantySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    await saveSubmission("warranty", parsed.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to register warranty" }, { status: 500 });
  }
}
