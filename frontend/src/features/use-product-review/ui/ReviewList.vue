<template>
  <ul v-if="filteredReviews" @scroll="loadFiveReviews"
      class="flex flex-col overflow-y-auto no-scrollbar scroll-smooth min-h-80 max-h-200">
    <ReviewItem v-for="review in visibleReviews"
                :review="review"
                :user-avatar="userAvatar"
                @toggle-review="toggleReviewPhotos" />
  </ul>
</template>

<script setup lang="ts">
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { reviewsHelper } from "@/features/use-product-review/lib/reviews-helper.ts";
import { toggleReviewPhotos } from "@/features/use-product-review/lib/review-photo-modal.ts";
import type {Review} from "@/entities/product-review/model/reviews.types.ts";

defineProps<{
  filteredReviews: Review[];
  visibleReviews: Review[];
}>();

import ReviewItem from "@/entities/product-review/ui/ReviewItem.vue"

const { userAvatar } = useProfile();
const { loadFiveReviews } = reviewsHelper();
</script>

<style scoped>

</style>