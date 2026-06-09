import { notFound } from "next/navigation";
import { getCollectionBySlug, getCollections } from "@/services/collection-service";
import { getProductsByCollection } from "@/services/product-service";
import { ProductListing } from "@/components/product/product-listing";
import { generatePageMetadata } from "@/lib/seo";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};
  return generatePageMetadata({
    title: collection.title,
    description: collection.description || `Shop ${collection.title} at CrownMate`,
    path: `/collections/${slug}`,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = await getProductsByCollection(slug);

  return (
    <ProductListing
      products={products}
      title={collection.title}
      description={collection.description || undefined}
    />
  );
}
