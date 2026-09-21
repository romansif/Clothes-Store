<template>
  <div class="font-dm-sans flex justify-between">
    <div v-for="filter in reviewsFilter"
         :class="['flex flex-col gap-2',
         filter.isActive ? 'font-bold' : 'font-normal']">
      <span @click="filteredReviews(route.params.id, filter.type)" :class="['text-lg transition duration-500 hover:scale-120 cursor-pointer',
            filter.isActive ? 'text-black' : 'text-[#A3A3A3] hover:text-black']">
        {{ filter.review }}
      </span>
      <div v-if="filter.isActive" class="border-t-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";
import { reviewsStore } from "@/features/use-product-reviews/model/reviews.store.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

defineProps<{
  reviews: Review[]
}>();

const route = useRoute();

const { reviewsFilter } = reviewsStore();
const { filteredReviews } = useGetReviews();
</script>

<style scoped>

</style>