<template>
  <div class="flex font-dm-sans gap-15">
    <div class="flex flex-col">
      <div class="flex items-baseline gap-2.5">
        <span class="text-[115px] font-semibold leading-none">{{ averageRating(reviews) }}</span>
        <span class="text-3xl leading-none">/</span>
        <span class="text-3xl leading-none">5</span>
      </div>
      <div class="flex items-center">
        <img v-for="index in Math.ceil(averageRating(reviews))" :key="index"
             :src="starCountSrc(index, averageRating(reviews))" alt="" class="w-12">
      </div>
      <span class="text-[#A3A3A3] text-xl mt-5">{{ reviews.length }} reviews</span>
    </div>
    <div class="font-semibold flex flex-col gap-4">
      <div v-for="rating in reverseRatings" class="flex text-left gap-9">
        <div class="flex text-left gap-1.5">
          <span class="text-lg">{{ rating }}</span>
          <img :src="star" alt="" class="w-6">
        </div>
        <div class="w-100 h-5 bg-[#D9D9D9] rounded-sm overflow-hidden">
          <div class="h-full bg-black" :style="{ width: `${percentage(reviews, rating)}%`}"></div>
        </div>
        <span class="text-xl">{{ ratingCount(reviews, rating) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ratingHelper } from "@/entities/product-review/lib/rating-helper.ts";
import { reverseRatings } from "@/entities/product-review/model/review.rating.ts";
import type {Review} from "@/entities/product-review/model/reviews.types.ts";

defineProps<{
  reviews: Review[]
}>();

import star from "@/assets/icons/products/full-star.png";

const { averageRating, percentage, ratingCount, starCountSrc } = ratingHelper();
</script>

<style scoped>

</style>