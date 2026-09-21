<template>
  <ul v-if="reviews.length" class="flex flex-col">
    <ReviewsComment v-for="review in visibleReviews" :review="review" />
  </ul>
</template>

<script setup lang="ts">
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";
import { reviewsHelper } from "@/features/use-product-reviews/lib/reviews-helper.ts";

import ReviewsComment from "@/features/use-product-reviews/ui/ReviewsComment.vue"

const { reviews } = useGetReviews();
const { visibleReviews } = reviewsHelper();
</script>

<style scoped>

</style>