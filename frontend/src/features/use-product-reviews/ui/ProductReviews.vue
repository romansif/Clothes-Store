<template>
  <div v-if="reviews.length" class="font-raleway flex flex-col gap-20 mb-5">
    <div class="flex flex-col gap-15">
      <div class="flex flex-col gap-2">
        <h1 class="font-bold text-5xl">Reviews</h1>
        <h2 v-if="reviews" class="text-[#A3A3A3] text-xl">
          Based on
          <span class="font-dm-sans">{{ reviews.length }}</span>
          reviews
        </h2>
      </div>
      <ReviewsRating :reviews="reviews" />
    </div>
    <div class="flex flex-col gap-5 w-full">
      <ReviewsFilter :reviews="reviews" />
      <CommentList />
      <div class="flex flex-col items-center gap-2.5">
        <BaseButton name="Load more reviews" variant="loadReviews" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

defineProps<{
  reviews: Review[],
}>();

import ReviewsRating from "@/features/use-product-reviews/ui/ReviewsRating.vue";
import ReviewsFilter from "@/features/use-product-reviews/ui/ReviewsFilter.vue";
import CommentList from "@/features/use-product-reviews/ui/CommentList.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";

const { reviews } = useGetReviews();
</script>

<style scoped>

</style>