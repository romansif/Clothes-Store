<template>
  <div class="flex justify-between">
    <div class="font-bold flex flex-col gap-2">
      <span class="text-lg transition duration-500 hover:scale-120 cursor-pointer">
        All reviews
        <span class="font-dm-sans">({{ reviews.length }})</span>
      </span>
      <div class="border-t-2"></div>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-lg transition duration-500 hover:scale-120 cursor-pointer">
        With photos
        <span class="font-dm-sans">(24)</span>
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-lg transition duration-500 hover:scale-120 cursor-pointer">
        Latest
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-lg transition duration-500 hover:scale-120 cursor-pointer">
        Highest rated
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-lg transition duration-500 hover:scale-120 cursor-pointer">
        Low rated
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

defineProps<{
  reviews: Review[]
}>();

</script>

<style scoped>

</style>