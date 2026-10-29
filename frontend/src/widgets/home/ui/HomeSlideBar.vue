<template>
    <div class="font-montserrat relative mt-12 w-368 overflow-hidden">
        <Transition name="slide" mode="out-in">
            <div
                :key="homeSlides[activeSlide].id"
                class="flex h-96 justify-between rounded-2xl bg-black"
            >
                <div
                    style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
                    class="flex flex-col justify-center gap-2 px-20"
                >
                    <div class="flex w-100 flex-col gap-1 text-gray-50">
                        <div class="w-40 border-t-4 pb-6"></div>
                        <h2 class="text-5xl font-semibold break-all">
                            {{ homeSlides[activeSlide].title }}
                        </h2>
                        <h2 class="text-5xl font-semibold break-all">
                            {{ homeSlides[activeSlide].title1 }}
                        </h2>
                    </div>
                    <p class="break-after-allw-110 mt-2 text-lg text-gray-300">
                        {{ homeSlides[activeSlide].text }}
                    </p>
                    <div class="mt-8 flex w-110 items-center justify-between">
                        <router-link
                            :to="{ name: `${homeSlides[activeSlide].routeName}` }"
                            class="transition duration-500 hover:scale-108"
                        >
                            <span
                                class="w-fit cursor-pointer break-after-all border-b-2 pb-1.5 text-2xl font-medium text-gray-200"
                            >
                                {{ homeSlides[activeSlide].routeText }}
                            </span>
                        </router-link>
                        <router-link
                            :to="{ name: `${homeSlides[activeSlide].routeName}` }"
                            class="transition duration-500 hover:scale-108"
                        >
                            <img :src="right_shop" alt="" class="w-18 cursor-pointer" />
                        </router-link>
                    </div>
                </div>
                <img :src="homeSlides[activeSlide].url" alt="" class="rounded-r-2xl opacity-75" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { filterProduct } from "@/shared/lib/filter-product";
import { homeSlides } from "@/widgets/home/model/slides";

import right_shop from "@/assets/icons/arrows/go-shop.svg";

const { activeSlide } = filterProduct();

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
    interval = setInterval(() => {
        activeSlide.value = (activeSlide.value + 1) % homeSlides.length;
    }, 8000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>
