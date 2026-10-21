<template>
  <div class="flex flex-col">
    <div class="flex gap-1">
      <h2 class="text-lg">Your rating</h2>
      <span class="text-red-500">*</span>
    </div>
    <div class="flex items-center gap-10 mt-5">
      <div class="flex items-center gap-5">
        <img v-for="rating in ratings" :key="rating"
             :src="ratingSrc(rating)" alt=""
             :class="ratingStar(reviewForm.rating, rating)"
             @click="emit('addRating', rating)">
      </div>
      <span class="text-sm text-[#A3A3A3]">Tap to rate (1-5 star)</span>
    </div>
    <span v-if="reviewFormMessages.rating" class="font-semibold text-xs text-red-600 mt-4">{{ reviewFormMessages.rating }}</span>
  </div>
</template>

<script setup lang="ts">
import { ratingSrc } from "@/entities/review-form/lib/show-rating.ts";
import { ratingStar } from "@/entities/review-form/model/rating-star.variants.ts";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form.ts";

defineProps<{
  ratings: number[];
}>();

const emit = defineEmits<{
  addRating: [rating: number];
}>();
</script>
