<template>
  <li class="flex flex-col gap-2 py-5 border-t border-[#D9D9D9]">
    <div class="font-medium flex gap-10 w-full">
      <img :src="userAvatar(userData)" alt="" class="h-15.5 bg-[#D9D9D9] rounded-full">
      <div class="flex flex-col gap-2.5">
        <div class="flex flex-col gap-2.5">
          <div class="flex gap-1">
            <span>{{ review.user.name }}</span>
            <span>{{ review.user.surName[0] }}.</span>
          </div>
          <span class="font-dm-sans text-[#A3A3A3]">{{ review.created_at }}</span>
        </div>
        <p>{{ review.comment }}</p>
      </div>
      <div class="flex items-center ml-auto gap-2.5">
        <img v-for="index in Math.ceil(review.rating)"
             :key="index" :src="starCountSrc(index, review.rating)" alt="" class="w-10">
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { reviewsHelper } from "@/features/use-product-reviews/lib/reviews-halper.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

defineProps<{
  review: Review;
}>();

const { userData } = userStore();
const { userAvatar } = useProfile();
const { starCountSrc } = reviewsHelper();
</script>

<style scoped>

</style>