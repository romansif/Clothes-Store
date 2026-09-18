<template>
  <ul v-if="reviews.length" class="flex flex-col">
    <ReviewsComment v-for="review in reviews" :review="review" />
  </ul>
</template>

<script setup lang="ts">
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";

import ReviewsComment from "@/features/use-product-reviews/ui/ReviewsComment.vue"

const { reviews } = useGetReviews();
</script>

<style scoped>

</style>