<template>
    <div
        @click="emit('toggleReview', [], 0)"
        class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    >
        <div @click.stop class="flex items-center gap-15">
            <img
                :src="arrow"
                alt=""
                v-if="reviewImages.length > 1"
                @click="emit('changePhoto', 'prev', reviewImages)"
                class="w-20 rotate-180 cursor-pointer transition duration-500 hover:scale-120"
            />
            <div class="flex rounded-xl bg-white">
                <img
                    :src="reviewAngel(reviewImages)[currentIndex]"
                    alt=""
                    class="h-150 w-170 rounded-xl"
                />
            </div>
            <img
                :src="arrow"
                alt=""
                v-if="reviewImages.length > 1"
                @click="emit('changePhoto', 'next', reviewImages)"
                class="w-20 cursor-pointer transition duration-500 hover:scale-120"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ratingHelper } from "@/entities/product-review/lib/rating-helper";
import type { ImageItem } from "@/entities/product-review";

import arrow from "@/assets/icons/arrows/arrow-gray.svg";

defineProps<{
    currentIndex: number;
    reviewImages: ImageItem[];
}>();

const emit = defineEmits<{
    toggleReview: [array: [], index: number];
    changePhoto: [type: string, images: ImageItem[]];
}>();

const { reviewAngel } = ratingHelper();
</script>
