import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@backend/lib/auth/get-auth-user";
import { processCheckout } from "@backend/services/checkout.service";
import { checkoutSchema } from "@/schemas/contact-schema";
import type { CartItem } from "@/types";

export const runtime = "nodejs";

const checkoutRequestSchema = z.object({
  form: checkoutSchema,
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string(),
      slug: z.string(),
      title: z.string(),
      variantTitle: z.string(),
      price: z.number(),
      compareAtPrice: z.number().nullable().optional(),
      quantity: z.number().int().min(1),
      image: z.string(),
    }),
  ),
  couponCode: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checkoutRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid checkout payload" },
        { status: 400 },
      );
    }

    const authUser = await getAuthUser(request);
    const result = await processCheckout({
      form: parsed.data.form,
      items: parsed.data.items as CartItem[],
      couponCode: parsed.data.couponCode,
      userId: authUser?._mongoId ?? null,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({
      order: result.order,
      razorpayKeyId: result.razorpayKeyId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to process checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
