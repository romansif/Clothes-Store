<template>
  <div class="flex flex-col">
    <div class="flex gap-1">
      <h2 class="text-lg">Your rating</h2>
      <span class="text-red-500">*</span>
    </div>
    <div class="flex items-center gap-15 mt-5">
      <div class="flex items-center gap-5">
        <img v-for="rating in ratings" :key="rating"
             :src="ratingSrc(rating)" alt=""
             :class="ratingStar(rating)"
             @click="addRating(rating)">
      </div>
      <span class="text-sm text-[#A3A3A3]">Tap to rate (1-5 star)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addRating, ratingSrc } from "@/features/use-review-form/lib/add-rating-star.ts";
import { reviewsClasses } from "@/shared/const/review/reviews.classes.ts";
import { reviewsStore } from "@/features/use-product-reviews/model/reviews.store.ts";

const { ratingStar } = reviewsClasses();
const { ratings } = reviewsStore();
</script>

<style scoped>

</style>