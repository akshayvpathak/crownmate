import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { updateVariantById } from "@backend/lib/product-store";
import { requireAdmin } from "@backend/lib/auth/require-admin";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; variantId: string }> },
) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { id, variantId } = await params;
  let body: {
    title?: string;
    price?: number;
    compareAtPrice?: number | null;
    available?: boolean;
    sku?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await updateVariantById(id, variantId, body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  revalidatePath("/products");
  revalidatePath(`/products/${result.product.slug}`);

  return NextResponse.json({ product: result.product });
}
