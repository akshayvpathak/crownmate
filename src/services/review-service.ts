import type { Review } from "@/types";
import reviewsData from "@/data/reviews.json";

const reviews = reviewsData as Review[];

export async function getReviews(productSlug?: string): Promise<Review[]> {
  if (productSlug) {
    return reviews.filter((r) => r.productSlug === productSlug);
  }
  return reviews;
}

export async function getProductRating(
  productSlug: string,
): Promise<{ rating: number; count: number }> {
  const productReviews = await getReviews(productSlug);
  if (productReviews.length === 0) return { rating: 4.5, count: 100 };
  const avg =
    productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
  return { rating: Math.round(avg * 100) / 100, count: productReviews.length };
}
