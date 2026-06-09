import Link from "next/link";
import { getComboProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";

export async function CombosSection() {
  const products = await getComboProducts();

  return (
    <section className="section-padding bg-white">
      <div className="container-frizty">
        <div className="mb-6 text-center md:mb-10">
          <h2 className="section-heading">Explore Our Best Combos</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Discover our top products that elevate women&apos;s care with style and
            innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-5 min-[400px]:gap-x-3 sm:gap-y-6 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/collections/combo">EXPLORE ALL PRODUCTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
