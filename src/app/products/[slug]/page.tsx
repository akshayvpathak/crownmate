import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/services/product-service";
import { getReviews } from "@/services/review-service";
import { generatePageMetadata, generateProductJsonLd } from "@/lib/seo";
import { ProductDetail } from "@/components/product/product-detail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return generatePageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${slug}`,
    image: product.images[0],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, relatedProducts] = await Promise.all([
    getReviews(slug),
    getRelatedProducts(slug),
  ]);
  const jsonLd = generateProductJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail
        product={product}
        reviews={reviews}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
