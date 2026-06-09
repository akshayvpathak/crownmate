import type { Product } from "@/types";
import { ProductCard } from "@/components/shared/product-card";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="section-padding border-t border-border bg-secondary/40">
      <div className="container-site">
        <h2 className="section-heading">Goes well with this</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Most people add one of these to round out their routine.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 min-[400px]:gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
