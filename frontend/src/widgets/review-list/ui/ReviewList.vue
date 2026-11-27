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
import { userAvatar } from "@/shared/lib";
import { reviewsStore } from "@/shared/model";
import { reviewsHelper } from "@/features/review-dashboard";
import { reviewFilter } from "@/features/product-review-filter";
import { toggleReviewPhotos } from "@/features/review-dashboard";
import { ReviewItem } from "@/entities/product-review";
import type { Review } from "@/shared/model";

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
