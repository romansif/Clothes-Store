<template>
  <ul v-if="filteredReviews" @scroll="loadFiveReviews"
      class="flex flex-col overflow-y-auto no-scrollbar scroll-smooth min-h-80 max-h-200">
    <ReviewItem v-for="review in visibleReviews"
                :review="review"
                :user-avatar="userAvatar"
                @toggle-review="toggleReviewPhotos" />
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store.ts";
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";
import { reviewsHelper } from "@/features/use-product-review/lib/reviews-helper.ts";
import { toggleReviewPhotos } from "@/features/use-product-review/lib/review-photo-modal.ts";

import ReviewItem from "@/entities/product-review/ui/ReviewItem.vue"

const route = useRoute();

const { userAvatar } = useProfile();
const { loadFiveReviews } = reviewsHelper();
const { getFilteredReviews } = useGetReviews();
const { visibleReviewsCount, reviewFilter} = reviewsStore();

const { data: filteredReviews } = useQuery({
  queryKey: ["filteredReviews", route.params.id, reviewFilter.value],
  queryFn: () => getFilteredReviews(route.params.id, reviewFilter.value),
  initialData: []
});

const visibleReviews = computed(() => {
  return filteredReviews.value.slice(0, visibleReviewsCount.value);
});
</script>

<style scoped>

</style>