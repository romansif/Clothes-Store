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
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { reviewsHelper } from "@/features/review-dashboard/lib/reviews-helper";
import { reviewFilter } from "@/features/product-review-filter/model/review-filter.store";
import { toggleReviewPhotos } from "@/features/review-dashboard/lib/review-photo-modal";
import { useFilteredReviewsData } from "@/widgets/review-list/lib/use-rewiev-data";
import { ReviewItem } from "@/entities/product-review";

const route = useRoute();

const { loadFiveReviews } = reviewsHelper();
const { visibleReviewsCount } = reviewsStore();
const { filteredReviews } = useFilteredReviewsData(route)

const visibleReviews = computed(() =>
    (filteredReviews.value ?? []).slice(0, visibleReviewsCount.value)
);

watch(reviewFilter, () => {
  visibleReviewsCount.value = 4;
});
</script>
