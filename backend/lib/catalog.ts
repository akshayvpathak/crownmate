import { loadProducts } from "@backend/lib/product-store";
import { rupeesToPaise } from "@backend/lib/pricing";
import type { CartItem, Product } from "@/types";

const DESCRIPTION_SNAPSHOT_MAX = 600;

export type ValidatedLineItem = {
  productId: string;
  variantId: string;
  slug: string;
  title: string;
  variantTitle: string;
  quantity: number;
  unitPricePaise: number;
  priceRupees: number;
  compareAtPrice?: number | null;
  image: string;
};

export type OrderLineItemSnapshot = ValidatedLineItem & {
  descriptionSnapshot?: string;
  categorySnapshot?: string;
};

function truncateDescription(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= DESCRIPTION_SNAPSHOT_MAX) return t;
  return `${t.slice(0, DESCRIPTION_SNAPSHOT_MAX)}…`;
}

export function enrichLineItemsWithCatalogSnapshot(
  items: ValidatedLineItem[],
  products: Product[],
): OrderLineItemSnapshot[] {
  return items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      descriptionSnapshot: product
        ? truncateDescription(product.description)
        : undefined,
      categorySnapshot: product?.category,
    };
  });
}

export async function validateCartItems(
  items: Pick<CartItem, "productId" | "variantId" | "slug" | "quantity">[],
): Promise<
  | { ok: true; items: ValidatedLineItem[]; subtotalRupees: number }
  | { ok: false; error: string }
> {
  if (!items.length) {
    return { ok: false, error: "Cart is empty" };
  }

  const products = await loadProducts();
  const validatedItems: ValidatedLineItem[] = [];
  let subtotalRupees = 0;

  for (const item of items) {
    const qty = Math.floor(item.quantity);
    if (!item.variantId || qty < 1 || qty > 50) {
      return { ok: false, error: "Invalid cart item" };
    }

    const product = products.find(
      (p) => p.id === item.productId || p.slug === item.slug,
    );
    if (!product) {
      return { ok: false, error: `Unknown product: ${item.productId}` };
    }

    const variant = product.variants.find((v) => v.id === item.variantId);
    if (!variant) {
      return { ok: false, error: `Unknown variant: ${item.variantId}` };
    }

    if (!variant.available) {
      return { ok: false, error: `${product.title} is out of stock` };
    }

    const unitPricePaise = rupeesToPaise(variant.price);
    subtotalRupees += variant.price * qty;

    validatedItems.push({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      title: product.title,
      variantTitle: variant.title,
      quantity: qty,
      unitPricePaise,
      priceRupees: variant.price,
      compareAtPrice: variant.compareAtPrice,
      image: variant.image ?? product.images[0] ?? "",
    });
  }

  if (subtotalRupees < 1) {
    return { ok: false, error: "Order amount too small" };
  }

  return { ok: true, items: validatedItems, subtotalRupees };
}

export async function getProductsCatalogSummary() {
  const products = await loadProducts();
  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    title: product.title,
    description: product.description,
    category: product.category ?? "",
    vendor: product.vendor,
    image: product.images[0] ?? null,
    images: product.images,
    variantCount: product.variants.length,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      sku: variant.sku,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice ?? null,
      available: variant.available,
    })),
  }));
}
