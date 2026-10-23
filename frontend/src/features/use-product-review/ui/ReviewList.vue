<template>
  <ul v-if="filteredReviews" @scroll="loadFiveReviews"
      class="flex flex-col overflow-y-auto no-scrollbar scroll-smooth min-h-80 max-h-200">
    <ReviewItem v-for="review in visibleReviews"
                :key="review.id"
                :review="review"
                :user-avatar="userAvatar"
                @toggle-review="toggleReviewPhotos" />
  </ul>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { keepPreviousData, useQuery} from "@tanstack/vue-query";
import { userAvatar } from "@/features/use-profile/lib/use-profile";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store";
import { useGetReviews } from "@/shared/api/get-reviews";
import { reviewsHelper } from "@/features/use-product-review/lib/reviews-helper";
import { toggleReviewPhotos } from "@/features/use-product-review/lib/review-photo-modal";
import { ReviewItem } from "@/entities/product-review";

const route = useRoute();

const { loadFiveReviews } = reviewsHelper();
const { getFilteredReviews } = useGetReviews();
const { visibleReviewsCount, reviewFilter} = reviewsStore();

const { data: filteredReviews } = useQuery({
  queryKey: ["filteredReviews", route.params.id, reviewFilter],
  queryFn: () => getFilteredReviews(route.params.id, reviewFilter.value),
  placeholderData: keepPreviousData,
});

const visibleReviews = computed(() =>
    (filteredReviews.value ?? []).slice(0, visibleReviewsCount.value)
);

watch(reviewFilter, () => {
  visibleReviewsCount.value = 4;
});
</script>
