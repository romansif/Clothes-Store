import { computed } from "vue";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useGetReviews } from "@/shared/api/get-reviews";
import { reviewFilter } from "@/features/product-review-filter/model/review-filter.store";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const { getReviews, getFilteredReviews } = useGetReviews();

export const useReviewsData = () => {
    const { data: reviews } = useQuery({
        queryKey: computed(() => ['reviews']),

        queryFn: () => {
            return getReviews();
        },
    });

    const reviewItems = computed(() => reviews.value ?? []);

    return {
        reviews: reviewItems,
    };
}

export const useFilteredReviewsData = (route: RouteLocationNormalizedLoaded) => {
    const { data: filteredReviews } = useQuery({
        queryKey: computed(() => ["filteredReviews", route.params.id, reviewFilter]),

        queryFn: () => {
            return getFilteredReviews(route.params.id, reviewFilter.value)
        },

        placeholderData: keepPreviousData,
    });

    return {
        filteredReviews
    }
}