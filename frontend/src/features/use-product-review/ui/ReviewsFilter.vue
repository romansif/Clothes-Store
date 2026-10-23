<template>
  <div class="font-dm-sans flex gap-30">
    <div v-for="(isActive, filter) in reviewsType"
         :class="[reviewFilterBlock,
         isActive ? 'font-semibold' : '']">
      <span :class="[reviewFilterNameClass,
            isActive ? selectedFilterNameClass : '']"
            @click="toggleFilter(filter)">
        {{ filter }}
      </span>
      <div v-if="isActive" class="border-t-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { filterReviews } from "@/features/use-product-review/lib/filter-reviews";
import {
  reviewFilterBlock,
  reviewFilterNameClass,
  selectedFilterNameClass
} from "@/features/use-product-review/model/review-filter.variants";

const { reviewsType, toggleFilter } = filterReviews()
</script>
