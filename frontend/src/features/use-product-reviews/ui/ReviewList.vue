<template>
  <ul v-if="reviews.length" @scroll="loadFiveReviews" class="flex flex-col overflow-y-auto no-scrollbar h-200">
    <ReviewItem v-for="review in visibleReviews" :review="review" />
  </ul>
</template>

<script setup lang="ts">
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";
import { reviewsHelper } from "@/features/use-product-reviews/lib/reviews-helper.ts";

import ReviewItem from "@/features/use-product-reviews/ui/ReviewItem.vue"

const { reviews } = useGetReviews();
const { loadFiveReviews, visibleReviews } = reviewsHelper();
</script>

<style scoped>

</style>