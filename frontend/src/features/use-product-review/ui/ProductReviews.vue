<template>
  <div v-if="reviews" class="font-raleway flex flex-col gap-20 mb-5">
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
      <ReviewsFilter />
      <ReviewList />
    </div>
  </div>
  <Transition name="modal">
    <ReviewPhotos v-if="reviewModal"
                  :current-index="currentIndex"
                  :review-images="reviewImages"
                  @toggle-review="toggleReviewPhotos"
                  @change-photo="changeReviewPhoto" />
  </Transition>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";
import { changeReviewPhoto, toggleReviewPhotos } from "@/features/use-product-review/lib/review-photo-modal.ts";
import { reviewModal } from "@/features/use-product-review/lib/review-photo-modal.ts";
import { currentIndex, reviewImages } from "@/features/use-product-review/lib/review-photo-modal.ts";

import ProductRating from "@/entities/product-review/ui/ProductRating.vue";
import ReviewsFilter from "@/features/use-product-review/ui/ReviewsFilter.vue";
import ReviewList from "@/features/use-product-review/ui/ReviewList.vue";
import ReviewPhotos from "@/entities/product-review/ui/ReviewPhotos.vue";

const { getReviews } = useGetReviews();

const { data: reviews } = useQuery({
  queryKey: ["reviews"],
  queryFn: () => getReviews()
})
</script>

<style scoped>

</style>