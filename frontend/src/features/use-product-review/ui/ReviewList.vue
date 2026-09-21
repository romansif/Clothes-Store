<template>
  <ul v-if="reviews.length" @scroll="loadFiveReviews"
      class="flex flex-col overflow-y-auto no-scrollbar h-200">
    <ReviewItem v-for="review in visibleReviews" :review="review" @toggle-review="toggleReviewPhotos"/>
  </ul>
</template>

<script setup lang="ts">
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";
import { reviewsHelper } from "@/features/use-product-review/lib/reviews-helper.ts";
import { toggleReviewPhotos } from "@/features/use-product-review/lib/review-photo-modal.ts";

import ReviewItem from "@/entities/product-review/ui/ReviewItem.vue"

const { reviews } = useGetReviews();
const { loadFiveReviews, visibleReviews } = reviewsHelper();
</script>

<style scoped>

</style>