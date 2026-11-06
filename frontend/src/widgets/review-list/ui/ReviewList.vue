<template>
  <TransitionGroup
    name="list"
    tag="ul"
    v-if="props.reviews"
    @scroll="loadFiveReviews"
    class="no-scrollbar flex max-h-200 min-h-80 flex-col overflow-y-auto scroll-smooth"
  >
    <ReviewItem
      v-for="review in visibleReviews"
      :key="review.id"
      :review="review"
      :user-avatar="avatar"
      @toggle-review="toggleReviewPhotos"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { reviewsHelper } from "@/features/review-dashboard/lib/reviews-helper";
import { reviewFilter } from "@/features/product-review-filter/model/review-filter.store";
import { toggleReviewPhotos } from "@/features/review-dashboard/lib/review-photo-modal";
import { ReviewItem } from "@/entities/product-review";
import type { Review } from "@/entities/product-review";

const props = defineProps<{
  reviews: Review[];
}>();

const { avatar } = userAvatar();
const { loadFiveReviews } = reviewsHelper();
const { visibleReviewsCount } = reviewsStore();

const visibleReviews = computed(() => (props.reviews ?? []).slice(0, visibleReviewsCount.value));

watch(reviewFilter, () => {
  visibleReviewsCount.value = 4;
});
</script>
