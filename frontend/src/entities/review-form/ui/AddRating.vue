<template>
  <div class="flex flex-col">
    <div class="flex gap-1">
      <h2 class="text-lg">{{ t("reviews.yourRating") }}</h2>
      <span class="text-red-500">*</span>
    </div>
    <div class="mt-5 flex items-center gap-10">
      <div class="flex items-center gap-5">
        <img
          v-for="rating in props.ratings"
          :key="rating"
          :src="ratingSrc(rating)"
          alt=""
          :class="ratingStar(reviewForm.rating, rating)"
          @click="emit('addRating', rating)"
        />
      </div>
      <span class="text-sm text-[#A3A3A3]">{{ t("reviews.tapToRate") }}</span>
    </div>
    <span v-if="reviewFormMessages.rating" class="mt-4 text-xs font-semibold text-red-600">{{
      reviewFormMessages.rating
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ratingSrc } from "@/entities/review-form/lib/show-rating";
import { ratingStar } from "@/entities/review-form/model/rating-star.variants";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";

const props = defineProps<{
  ratings: number[];
}>();

const emit = defineEmits<{
  addRating: [rating: number];
}>();

const { t } = useI18n();
</script>
