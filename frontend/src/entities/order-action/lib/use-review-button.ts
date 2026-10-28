import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGetReviews } from "@/shared/api/get-reviews";
import type { Review } from "@/entities/product-review";

const { getReviews } = useGetReviews();

export const useReviewButton = async () => {
    const { data: reviews } = useQuery({
        queryKey: ['reviews'],
        queryFn: () => getReviews(),
    });

    const hasReviewed = computed(() =>
        (reviews.value ?? []).some(
            (review: Review) => review.userId === localStorage.getItem("userId")
        )
    );

    return {
        hasReviewed
    };
};