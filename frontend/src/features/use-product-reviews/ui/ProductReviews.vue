<template>
  <div v-if="reviews.length" class="font-raleway flex flex-col gap-20 mb-5">
    <div class="flex flex-col gap-15">
      <div class="flex flex-col gap-2">
        <h1 class="font-bold text-5xl">Reviews</h1>
        <h2 class="text-[#A3A3A3] text-xl">
          Based on
          <span class="font-dm-sans">{{ reviews.length }}</span>
          reviews
        </h2>
      </div>
      <ProductRating :reviews="reviews" />
    </div>
    <div class="flex flex-col gap-5 w-full">
      <ReviewsFilter :reviews="reviews" />
      <ReviewList />
      <div class="flex flex-col items-center gap-2.5">
        <BaseButton v-if="visibleReviews.length === visibleReviewsCount"
                    @click="closeFiveReviews"
                    name="Close more reviews"
                    variant="loadReviews" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reviewsHelper } from "@/features/use-product-reviews/lib/reviews-helper.ts";
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";

import ProductRating from "@/features/use-product-reviews/ui/ProductRating.vue";
import ReviewsFilter from "@/features/use-product-reviews/ui/ReviewsFilter.vue";
import ReviewList from "@/features/use-product-reviews/ui/ReviewList.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";

const { reviews } = useGetReviews();
const { closeFiveReviews, visibleReviews, visibleReviewsCount } = reviewsHelper();
</script>

<style scoped>

</style>