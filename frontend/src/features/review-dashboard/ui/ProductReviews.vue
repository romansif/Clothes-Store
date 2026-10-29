<template>
    <Transition name="view" mode="out-in">
        <div>
            <Loader v-if="isLoading" variant="reviews" />
            <ErrorState v-else-if="isError" variant="reviews" />
            <div v-if="reviews.length" class="font-raleway mb-5 flex flex-col gap-20">
                <div class="flex flex-col gap-15">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-5xl font-bold">Reviews</h1>
                        <h2 class="text-xl text-[#A3A3A3]">
                            Based on
                            <span class="font-dm-sans">{{ reviews.length }}</span>
                            reviews
                        </h2>
                    </div>
                    <ProductRating :reviews="reviews" />
                </div>
                <div class="flex w-full flex-col gap-5">
                    <ReviewsFilter />
                    <ReviewList />
                </div>
            </div>
            <EmptyState v-else variant="reviews" />
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
import { useReviewsData } from "@/widgets/review-list/lib/use-review-data";
import {
    changeReviewPhoto,
    toggleReviewPhotos,
} from "@/features/review-dashboard/lib/review-photo-modal";
import { reviewModal } from "@/features/review-dashboard/lib/review-photo-modal";
import { currentIndex, reviewImages } from "@/features/review-dashboard/lib/review-photo-modal";
import { ProductRating, ReviewPhotos } from "@/entities/product-review";
import { ReviewList } from "@/widgets/review-list";
import { ReviewsFilter } from "@/features/product-review-filter";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";

const { reviews, isLoading, isError } = useReviewsData();
</script>
