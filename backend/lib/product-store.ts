import { promises as fs } from "fs";
import path from "path";
import type { Product, ProductVariant } from "@/types";

const PRODUCTS_FILE = path.join(process.cwd(), "src", "data", "products.json");

let cache: Product[] | null = null;

export async function loadProducts(): Promise<Product[]> {
  if (!cache) {
    const raw = await fs.readFile(PRODUCTS_FILE, "utf-8");
    cache = JSON.parse(raw) as Product[];
  }
  return cache;
}

export function invalidateProductCache(): void {
  cache = null;
}

export async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(PRODUCTS_FILE, `${JSON.stringify(products, null, 2)}\n`);
  cache = products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await loadProducts();
  return products.find((p) => p.id === id) ?? null;
}

function normalizeImageUrls(images: string[]): string[] | null {
  const cleaned = images.map((url) => url.trim()).filter(Boolean);
  if (!cleaned.length) return null;
  for (const url of cleaned) {
    if (
      !url.startsWith("/") &&
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      return null;
    }
  }
  return cleaned;
}

export async function updateProductById(
  id: string,
  input: Partial<
    Pick<Product, "title" | "description" | "category" | "vendor" | "images">
  >,
): Promise<{ ok: true; product: Product } | { ok: false; error: string }> {
  const products = await loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index < 0) return { ok: false, error: "Product not found" };

  if (input.title !== undefined && !input.title.trim()) {
    return { ok: false, error: "Title is required" };
  }

  const current = products[index];

  let nextImages = current.images;
  if (input.images !== undefined) {
    const normalized = normalizeImageUrls(input.images);
    if (!normalized) {
      return { ok: false, error: "At least one valid image path is required" };
    }
    nextImages = normalized;
  }

  const updated: Product = {
    ...current,
    title: input.title?.trim() ?? current.title,
    description: input.description?.trim() ?? current.description,
    category: input.category?.trim() ?? current.category,
    vendor: input.vendor?.trim() ?? current.vendor,
    images: nextImages,
    variants: current.variants.map((variant, i) =>
      i === 0 && input.images !== undefined
        ? { ...variant, image: nextImages[0] ?? variant.image }
        : variant,
    ),
  };

  const next = [...products];
  next[index] = updated;
  await saveProducts(next);
  return { ok: true, product: updated };
}

export async function updateVariantById(
  productId: string,
  variantId: string,
  input: Partial<
    Pick<ProductVariant, "title" | "price" | "compareAtPrice" | "available" | "sku">
  >,
): Promise<{ ok: true; product: Product } | { ok: false; error: string }> {
  const products = await loadProducts();
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex < 0) return { ok: false, error: "Product not found" };

  const product = products[productIndex];
  const variantIndex = product.variants.findIndex((v) => v.id === variantId);
  if (variantIndex < 0) return { ok: false, error: "Variant not found" };

  if (input.price !== undefined && (input.price < 1 || input.price > 1_000_000)) {
    return { ok: false, error: "Price must be between ₹1 and ₹10,00,000" };
  }

  if (input.sku !== undefined && !input.sku.trim()) {
    return { ok: false, error: "SKU is required" };
  }

  const current = product.variants[variantIndex];
  const updatedVariant: ProductVariant = {
    ...current,
    title: input.title?.trim() ?? current.title,
    sku: input.sku?.trim() ?? current.sku,
    price: input.price !== undefined ? Math.round(input.price) : current.price,
    compareAtPrice:
      input.compareAtPrice !== undefined
        ? input.compareAtPrice
        : current.compareAtPrice,
    available: input.available !== undefined ? input.available : current.available,
  };

  const updatedProduct: Product = {
    ...product,
    variants: product.variants.map((v, i) => (i === variantIndex ? updatedVariant : v)),
  };

  const next = [...products];
  next[productIndex] = updatedProduct;
  await saveProducts(next);
  return { ok: true, product: updatedProduct };
}
