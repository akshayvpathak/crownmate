import { getProducts } from "@/services/product-service";
import { ProductListing } from "@/components/product/product-listing";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Products",
  description:
    "RedLight Helmet, HF Wand, and Pulse Pro Massager — all CrownMate devices in one place.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductListing products={products} title="All Products" />;
}
