import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { updateProductById } from "@backend/lib/product-store";
import { requireAdmin } from "@backend/lib/auth/require-admin";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  let body: {
    title?: string;
    description?: string;
    category?: string;
    vendor?: string;
    images?: string[];
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await updateProductById(id, body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  revalidatePath("/products");
  revalidatePath(`/products/${result.product.slug}`);

  return NextResponse.json({ product: result.product });
}
