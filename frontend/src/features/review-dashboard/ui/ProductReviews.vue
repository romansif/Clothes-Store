<template>
  <Transition name="view" mode="out-in">
    <div>
      <Loader v-if="isLoading" variant="reviews" />
      <ErrorState v-else-if="isError" variant="reviews" :loading="isFetching" @reload="refetch()" />
      <div v-else-if="filteredReviews" class="font-raleway mb-5 flex flex-col gap-20">
        <div v-if="filteredReviews.length" class="flex flex-col gap-15">
          <div class="flex flex-col gap-2">
            <h1 class="text-5xl font-bold">{{ t("reviews.title") }}</h1>
            <h2 class="text-xl text-[#A3A3A3]">
              {{ t("reviews.basedOn") }}
              <span class="font-dm-sans">{{ filteredReviews.length }}</span>
              {{ t("reviews.title") }}
            </h2>
          </div>
          <ProductRating :reviews="filteredReviews" />
        </div>
        <div v-if="filteredReviews.length" class="flex w-full flex-col gap-5">
          <ReviewsFilter />
          <ReviewList :reviews="filteredReviews" />
        </div>
      </div>
      <EmptyState v-else variant="reviews" :loading="isFetching" @reload="refetch()" />
      <Transition name="modal">
        <ReviewPhotos
          v-if="reviewModal"
          :current-index="currentIndex"
          :review-images="reviewImages"
          @toggle-review="toggleReviewPhotos"
          @change-photo="changeReviewPhoto"
        />
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useFilteredReviewsData } from "@/widgets/review-list/lib/use-review-data";
import { changeReviewPhoto, toggleReviewPhotos } from "@/features/review-dashboard/lib/review-photo-modal";
import { reviewModal } from "@/features/review-dashboard/lib/review-photo-modal";
import { currentIndex, reviewImages } from "@/features/review-dashboard/lib/review-photo-modal";
import { ProductRating, ReviewPhotos } from "@/entities/product-review";
import { ReviewList } from "@/widgets/review-list";
import { ReviewsFilter } from "@/features/product-review-filter";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";

const route = useRoute();

const { t } = useI18n();
const { filteredReviews, isLoading, isFetching, isError, refetch } = useFilteredReviewsData(route);
</script>
