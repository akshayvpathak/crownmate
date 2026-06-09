import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/services/collection-service";
import { generatePageMetadata } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata = generatePageMetadata({
  title: "Collections",
  description: "Browse Frizty product collections by category.",
  path: "/collections",
});

const collectionImages: Record<string, string> = {
  "personal-care": images.categories.personalCare,
  "pill-organizer": images.categories.pillOrganizer,
  "essential-oil": images.categories.essentialOil,
  "electric-gua-sha-massager": images.categories.faceMassager,
  massager: images.categories.massager,
  "electric-trimmer": images.categories.trimmers,
  "feet-care": images.categories.feetCare,
  "heating-pad": images.categories.heatingPad,
  combo: images.products.wellnessCombo,
  "best-sellers": images.products.guaSha,
  "shop-all": images.categories.personalCare,
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="section-padding">
      <div className="container-frizty">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">Collections</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] bg-secondary">
                <Image
                  src={
                    collectionImages[collection.slug] ??
                    collection.image ??
                    images.categories.personalCare
                  }
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold group-hover:underline">
                  {collection.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {collection.productCount} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
