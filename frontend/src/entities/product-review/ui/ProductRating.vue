<template>
    <div class="font-dm-sans flex gap-15">
        <div class="flex flex-col">
            <div class="flex items-baseline gap-2.5">
                <span class="text-[115px] leading-none font-semibold">{{
                    averageRating(reviews)
                }}</span>
                <span class="text-3xl leading-none">/</span>
                <span class="text-3xl leading-none">5</span>
            </div>
            <div class="flex items-center">
                <img
                    v-for="index in Math.ceil(averageRating(reviews))"
                    :key="index"
                    :src="starCountSrc(index, averageRating(reviews))"
                    alt=""
                    class="w-12"
                />
            </div>
            <span class="mt-5 text-xl text-[#A3A3A3]">{{ reviews.length }} reviews</span>
        </div>
        <div class="flex flex-col gap-4 font-semibold">
            <div v-for="rating in reverseRatings" class="flex gap-9 text-left">
                <div class="flex gap-1.5 text-left">
                    <span class="text-lg">{{ rating }}</span>
                    <img :src="star" alt="" class="w-6" />
                </div>
                <div class="h-5 w-100 overflow-hidden rounded-sm bg-[#D9D9D9]">
                    <div
                        class="h-full bg-black"
                        :style="{ width: `${percentage(reviews, rating)}%` }"
                    ></div>
                </div>
                <span class="text-xl">{{ ratingCount(reviews, rating) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ratingHelper } from "@/entities/product-review/lib/rating-helper";
import { reverseRatings } from "@/entities/product-review/model/review-rating";
import type { Review } from "@/entities/product-review";

import star from "@/assets/icons/review/full-star.png";

defineProps<{
    reviews: Review[];
}>();

const { averageRating, percentage, ratingCount, starCountSrc } = ratingHelper();
</script>
