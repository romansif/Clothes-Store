import { computed } from "vue";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useGetReviews } from "@/shared/api/get-reviews";
import { reviewFilter } from "@/features/product-review-filter/model/review-filter.store";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const { getReviews, getFilteredReviews } = useGetReviews();

export const useReviewsData = () => {
    const { data: reviews, isPending, isError } = useQuery({
        queryKey: ['reviews'],
        queryFn: () => getReviews()
    });

    return {
        reviews: computed(() => reviews.value ?? []),
        isPending,
        isError
    };
}

export const useFilteredReviewsData = (route: RouteLocationNormalizedLoaded) => {
    const { data: filteredReviews, isPending, isError } = useQuery({
        queryKey: computed(() => ["filteredReviews", route.params.id, reviewFilter]),
        queryFn: () => getFilteredReviews(route.params.id, reviewFilter.value),
        enabled: computed(() => Boolean(route.params.id && reviewFilter.value)),
        placeholderData: keepPreviousData,
    });

    return {
        filteredReviews,
        isPending,
        isError
    }
}