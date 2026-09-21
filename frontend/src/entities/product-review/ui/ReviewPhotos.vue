<template>
  <div @click="toggleReviewPhotos([], 0)" class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <div @click.stop class="flex items-center gap-15">
      <img :src="arrow" alt=""
           @click="changeReviewPhoto('prev', reviewImages)"
           class="w-20 rotate-180 transition duration-500 hover:scale-120 cursor-pointer">
      <div class="flex bg-white rounded-xl">
        <img :src="reviewAngel(reviewImages)[currentIndex]" alt="" class="w-170 h-150 rounded-xl">
      </div>
      <img :src="arrow" alt=""
           @click="changeReviewPhoto('next', reviewImages)"
           class="w-20 transition duration-500 hover:scale-120 cursor-pointer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { reviewsHelper } from "@/features/use-product-review/lib/reviews-helper.ts";
import { currentIndex, reviewImages } from "@/features/use-product-review/lib/review-photo-modal.ts";

const emit = defineEmits<{
  toggleReview: [array: [], index: number];
  changePhoto: [type: string, images: ImageItem[]];
}>();

const toggleReviewPhotos = (array: [], index: number) => {
  emit('toggleReview', array, index);
};

const changeReviewPhoto = (type: string, images: ImageItem[]) => {
  emit('changePhoto', type, images)
}

import arrow from "@/assets/icons/arrows/arrow-gray.svg";
import type {ImageItem} from "@/entities/product-review/model/reviews.types.ts";

const { reviewAngel } = reviewsHelper();
</script>

<style scoped>

</style>