import { computed } from "vue";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useGetReviews } from "@/shared/api/get-reviews";
import { reviewFilter } from "@/features/product-review-filter/model/review-filter.store";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const { getReviews, getFilteredReviews } = useGetReviews();

export const useReviewsData = () => {
    const {
        data: reviews,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: ["reviews"],
        queryFn: () => getReviews(),
    });

    return {
        reviews: computed(() => reviews.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch
    };
};

export const useFilteredReviewsData = (route: RouteLocationNormalizedLoaded) => {
    const {
        data: filteredReviews,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: computed(() => ["filteredReviews", route.params.id, reviewFilter.value]),
        queryFn: () => getFilteredReviews(route.params.id, reviewFilter.value),
        enabled: computed(() => Boolean(route.params.id && reviewFilter.value)),
        placeholderData: keepPreviousData,
    });

    return {
        filteredReviews,
        isLoading,
        isFetching,
        isError,
        refetch
    };
};
