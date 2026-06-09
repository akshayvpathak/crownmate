import Link from "next/link";
import { getBestSellers } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";

export async function BestSellers() {
  const products = await getBestSellers();

  return (
    <section className="section-padding bg-secondary">
      <div className="container-site">
        <div className="mb-6 text-center md:mb-10">
          <h2 className="section-heading">Best Selling Products</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The three devices customers come back for.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-5 min-[400px]:gap-x-3 sm:gap-y-6 md:gap-x-5 md:gap-y-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:mt-12">
          <Button variant="outline" size="lg" className="min-w-[200px]" asChild>
            <Link href="/products">EXPLORE ALL PRODUCTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
