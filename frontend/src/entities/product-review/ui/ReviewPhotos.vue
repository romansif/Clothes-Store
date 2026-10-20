<template>
  <div @click="emit('toggleReview', [], 0)"
       class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
       flex items-center justify-center">
    <div @click.stop class="flex items-center gap-15">
      <img :src="arrow" alt=""
           v-if="reviewImages.length > 1"
           @click="emit('changePhoto', 'prev', reviewImages)"
           class="w-20 rotate-180 transition duration-500 hover:scale-120 cursor-pointer">
      <div class="flex bg-white rounded-xl">
        <img :src="reviewAngel(reviewImages)[currentIndex]" alt="" class="w-170 h-150 rounded-xl">
      </div>
      <img :src="arrow" alt=""
           v-if="reviewImages.length > 1"
           @click="emit('changePhoto', 'next', reviewImages)"
           class="w-20 transition duration-500 hover:scale-120 cursor-pointer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ratingHelper } from "@/entities/product-review/lib/rating-helper.ts";
import type {ImageItem} from "@/entities/product-review/model/reviews.types.ts";

import arrow from "@/assets/icons/arrows/arrow-gray.svg";

defineProps<{
  currentIndex: number;
  reviewImages: ImageItem[];
}>();

const emit = defineEmits<{
  toggleReview: [array: [], index: number];
  changePhoto: [type: string, images: ImageItem[]];
}>();

const { reviewAngel } = ratingHelper();
</script>
