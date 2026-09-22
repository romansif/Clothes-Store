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
             :class="ratingStar(reviewForm.rating, rating)"
             @click="addRating(rating)">
      </div>
      <span class="text-sm text-[#A3A3A3]">Tap to rate (1-5 star)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ratingSrc } from "@/entities/review-form/lib/rating.display.ts";
import { reviewsClasses } from "@/shared/const/review/reviews.classes.ts";
import { reviewForm } from "@/entities/review-form/model/review.form.ts";

defineProps<{
  ratings: number[]
}>();

const emit = defineEmits<{
  addRating: [rating: number];
}>();

const addRating = (rating: number) => {
  emit('addRating', rating);
};

const { ratingStar } = reviewsClasses();
</script>

<style scoped>

</style>