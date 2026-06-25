import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/services/collection-service";
import { generatePageMetadata } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata = generatePageMetadata({
  title: "Collections",
  description: "Browse Crownmate product collections by category.",
  path: "/collections",
});

const collectionImages: Record<string, string> = {
  "redlight-helmet": images.categories.redlightHelmet,
  "hf-wand": images.categories.hfWand,
  "scalp-massager": images.categories.scalpMassager,
  "serum-stamp": images.categories.serumStamp,
  "best-sellers": images.products.redlightHelmet,
  "shop-all": images.products.scalpMassager,
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="section-padding">
      <div className="container-site">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">Collections</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-secondary sm:aspect-[16/9]">
                <Image
                  src={
                    collectionImages[collection.slug] ??
                    collection.image ??
                    images.categories.redlightHelmet
                  }
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain sm:object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold group-hover:underline">
                  {collection.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {collection.productCount} product
                  {collection.productCount !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
