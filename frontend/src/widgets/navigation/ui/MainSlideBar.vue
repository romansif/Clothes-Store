<template>
    <div class="font-montserrat relative w-230 overflow-hidden">
        <Transition name="slide" mode="out-in">
            <div
                :key="mainSlides[activeSlide].id"
                class="flex h-45 justify-between rounded-2xl bg-black"
            >
                <div
                    style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
                    class="flex w-100 flex-col justify-center gap-3 px-15"
                >
                    <h2 class="break-after-all text-2xl font-semibold text-gray-50">
                        {{ mainSlides[activeSlide].title }}
                    </h2>
                    <p class="mt-2 w-70 break-after-all text-sm text-gray-300">
                        {{ mainSlides[activeSlide].text }}
                    </p>
                </div>
                <img
                    :src="mainSlides[activeSlide].url"
                    alt=""
                    class="w-115 rounded-r-2xl opacity-90"
                />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { filterProduct } from "@/shared/lib/filter-product.ts";
import { mainSlides } from "@/widgets/home/model/slides.ts";

const { activeSlide } = filterProduct();

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
    interval = setInterval(() => {
        activeSlide.value = (activeSlide.value + 1) % mainSlides.length;
    }, 4000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>
>
