<template>
  <div class="font-dm-sans flex gap-30">
    <div v-for="(isActive, filter) in reviewsType"
         :class="['flex flex-col gap-2',
         isActive ? 'font-semibold' : 'font-normal']">
      <span @click="toggleFilter(route.params.id, filter)"
            :class="['text-lg transition duration-500 hover:scale-120 cursor-pointer',
            isActive ? 'text-black scale-120' : 'text-[#8F8F8F] hover:text-black']">
        {{ filter }}
      </span>
      <div v-if="isActive" class="border-t-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { filterReviews } from "@/features/use-product-review/lib/filter-reviews.ts";

const route = useRoute();

const { reviewsType, toggleFilter } = filterReviews()
</script>

<style scoped>

</style>