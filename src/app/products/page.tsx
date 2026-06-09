import { getProducts } from "@/services/product-service";
import { ProductListing } from "@/components/product/product-listing";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Products",
  description:
    "Browse all Frizty personal care, wellness, and grooming products. Massagers, trimmers, pill organizers & more.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductListing products={products} title="All Products" />;
}
