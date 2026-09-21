<template>
  <div @click="toggleReviewPhotos([], 0)" class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <div @click.stop class="flex items-center gap-15">
      <img :src="arrow" alt=""
           @click="changeReviewPhoto('prev', reviewImages)"
           class="w-20 rotate-180 transition duration-500 hover:scale-120 cursor-pointer">
      <div class="flex bg-white rounded-sm">
        <img :src="reviewAngel(reviewImages)[currentIndex]" alt="" class="w-170 h-170 rounded-sm">
      </div>
      <img :src="arrow" alt=""
           @click="changeReviewPhoto('next', reviewImages)"
           class="w-20 transition duration-500 hover:scale-120 cursor-pointer">
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  changeReviewPhoto,
  currentIndex,
  reviewImages,
  toggleReviewPhotos
} from "@/features/use-product-reviews/lib/review-photo-modal.ts";
import { reviewsHelper } from "@/features/use-product-reviews/lib/reviews-helper.ts";

import arrow from "@/assets/icons/arrows/arrow-gray.svg";

const { reviewAngel } = reviewsHelper();
</script>

<style scoped>

</style>