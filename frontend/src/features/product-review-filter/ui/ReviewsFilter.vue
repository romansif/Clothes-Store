<template>
  <div class="font-dm-sans flex gap-30">
    <div v-for="(isActive, filter) in reviewsType" :class="[REVIEW_FILTER_BLOCK, isActive ? 'font-semibold' : '']">
      <span :class="[REVIEW_FILTER_NAME_CLASS, isActive ? SELECTED_FILTER_NAME_CLASS : '']" @click="toggleFilter(filter)">
        {{ t(reviewLabelKey(filter)) }}
      </span>
      <div v-if="isActive" class="scale-x-100 border-t-2 transition duration-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { filterReviews, reviewLabelKey } from "@/features/product-review-filter";
import {
  REVIEW_FILTER_BLOCK,
  REVIEW_FILTER_NAME_CLASS,
  SELECTED_FILTER_NAME_CLASS,
} from "@/features/review-dashboard";

const { t } = useI18n();
const { reviewsType, toggleFilter } = filterReviews();
</script>
