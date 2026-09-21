<template>
  <li class="flex flex-col gap-2 border-t border-[#D9D9D9] py-5">
    <div class="flex w-full gap-10 font-medium">
      <img :src="userAvatar(review.user.avatar)" alt="" class="h-15.5 rounded-full bg-[#D9D9D9]">
      <div class="flex flex-1 flex-col gap-2.5">
        <div class="flex gap-1">
          <span>{{ review.user.name }}</span>
          <span v-if="review.user.surName">{{ review.user.surName[0] }}.</span>
        </div>
        <div class="flex w-full items-center justify-between">
          <span class="font-dm-sans text-[#A3A3A3]">
            {{ review.created_at }}
          </span>
          <div class="flex items-center gap-2.5">
            <img v-for="index in Math.ceil(review.rating)" :key="index"
                :src="starCountSrc(index, review.rating)" alt="" class="w-8">
          </div>
        </div>
        <p>{{ review.comment }}</p>
        <div class="flex gap-5 mt-2.5">
          <img v-for="(img, index) in reviewAngel(review.images)" :key="index" :src="img" alt=""
               @click="toggleReviewPhotos(review.images, index)"
               class="bg-gray-50 h-45 w-45 border border-gray-300 transition duration-400 hover:scale-110
               cursor-pointer overflow-hidden rounded-lg">
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { reviewsHelper } from "@/features/use-product-review/lib/reviews-helper.ts";
import type {ImageItem, Review} from "@/entities/product-review/model/reviews.types.ts";

defineProps<{
  review: Review;
}>();

const emit = defineEmits<{
  toggleReview: [array: ImageItem[] | undefined, index: number];
}>();

const toggleReviewPhotos = (array: ImageItem[] | undefined, index: number) => {
  emit('toggleReview', array, index);
};

const { userAvatar } = useProfile();
const { starCountSrc, reviewAngel } = reviewsHelper();
</script>

<style scoped>

</style>