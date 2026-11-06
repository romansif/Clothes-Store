import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";

import type { Review } from "@/entities/product-review";
import { useGetReviews } from "@/shared/api/get-reviews";

const { getReviews } = useGetReviews();

export const useReviewButton = (productId: MaybeRefOrGetter<string | null | undefined>) => {
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(),
  });

  const hasReviewed = computed(() => {
    const id = toValue(productId);
    const userId = localStorage.getItem("userId");

    return (reviews.value ?? []).some((review: Review) => review.productId === id && review.userId === userId);
  });

  return {
    hasReviewed,
  };
};
