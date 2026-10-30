import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import type { Review } from "@/entities/product-review";
import { useGetReviews } from "@/shared/api/get-reviews";

const { getReviews } = useGetReviews();

export const useReviewButton = async () => {
    const { data: reviews } = useQuery({
        queryKey: ["reviews"],
        queryFn: () => getReviews(),
    });

    const hasReviewed = computed(() =>
        (reviews.value ?? []).some(
            (review: Review) => review.userId === localStorage.getItem("userId"),
        ),
    );

    return {
        hasReviewed,
    };
};
