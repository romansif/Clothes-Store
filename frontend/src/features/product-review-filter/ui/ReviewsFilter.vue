<template>
  <div class="font-dm-sans flex gap-30">
    <div v-for="(isActive, filter) in reviewsType" :class="[reviewFilterBlock, isActive ? 'font-semibold' : '']">
      <span :class="[reviewFilterNameClass, isActive ? selectedFilterNameClass : '']" @click="toggleFilter(filter)">
        {{ t(reviewLabelKey(filter)) }}
      </span>
      <div v-if="isActive" class="scale-x-100 border-t-2 transition duration-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { filterReviews, reviewLabelKey } from "@/features/product-review-filter/lib/filter-reviews";
import { reviewFilterBlock, reviewFilterNameClass, selectedFilterNameClass } from "@/features/review-dashboard/model/review-filter.variants";

const { t } = useI18n();
const { reviewsType, toggleFilter } = filterReviews();
</script>
