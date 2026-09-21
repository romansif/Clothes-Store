<template>
  <div class="flex font-dm-sans gap-63">
    <div class="flex flex-col">
      <div class="flex items-baseline gap-2.5">
        <span class="text-8xl font-semibold leading-none">{{ averageRating() }}</span>
        <span class="text-5xl font-light leading-none">/</span>
        <span class="text-3xl font-medium leading-none">5</span>
      </div>
      <div class="flex items-center gap-2.5">
        <img v-for="index in Math.ceil(averageRating())" :key="index"
             :src="starCountSrc(index, averageRating())" alt="" class="w-15">
      </div>
      <span class="text-[#A3A3A3] text-xl mt-5">{{ reviews.length }} reviews</span>
    </div>
    <div class="font-medium flex flex-col gap-6">
      <div v-for="rating in ratings.reverse()" class="flex items-center gap-5">
        <div class="flex items-center gap-2.5">
          <span class="text-xl">{{ rating }}</span>
          <img :src="star" alt="" class="w-5">
        </div>
        <div class="w-100 h-5 bg-[#D9D9D9] rounded-md overflow-hidden">
          <div class="h-full bg-black" :style="{ width: `${percentage(rating)}%`}"></div>
        </div>
        <span class="text-xl">{{ ratingCount(rating) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ratings } from "@/features/use-product-reviews/model/reviews.store.ts";
import {
  reviewsHelper
} from "@/features/use-product-reviews/lib/reviews-helper.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

defineProps<{
  reviews: Review[]
}>();

import star from "@/assets/icons/products/full-star.png";

const { averageRating, percentage, ratingCount, starCountSrc } = reviewsHelper();
</script>

<style scoped>

</style>