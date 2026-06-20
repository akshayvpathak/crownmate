import { NextResponse } from "next/server";
import { loadProducts } from "@backend/lib/product-store";
import { requireAdmin } from "@backend/lib/auth/require-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  try {
    const products = await loadProducts();
    const product = products.find((p) => p.id === "cm-redlight-helmet");

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      productId: product.id,
      title: product.title,
      variants: product.variants.map((v) => ({
        id: v.id,
        title: v.title,
        sku: v.sku,
        price: v.price,
        compareAtPrice: v.compareAtPrice,
        available: v.available,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
