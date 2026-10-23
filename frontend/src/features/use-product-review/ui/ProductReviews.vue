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
import { useGetReviews } from "@/shared/api/get-reviews";
import { changeReviewPhoto, toggleReviewPhotos } from "@/features/use-product-review/lib/review-photo-modal";
import { reviewModal } from "@/features/use-product-review/lib/review-photo-modal";
import { currentIndex, reviewImages } from "@/features/use-product-review/lib/review-photo-modal";
import { ProductRating, ReviewPhotos } from "@/entities/product-review";
import { ReviewList, ReviewsFilter } from "@/features/use-product-review";

const { getReviews } = useGetReviews();

const { data: reviews } = useQuery({
  queryKey: ["reviews"],
  queryFn: () => getReviews()
})
</script>
