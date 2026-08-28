<template>
  <div class="relative overflow-hidden w-368 mt-12">
    <Transition name="slide" mode="out-in">
      <div :key="homeSlides[activeSlide].id" class="bg-black flex justify-between h-96 rounded-2xl">
        <div class="flex flex-col justify-center gap-2 px-20">
          <div style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
               class="flex flex-col gap-1 text-gray-50 w-100">
            <div class="border-t-4 w-40 pb-6"></div>
            <h2 class="text-5xl font-semibold break-all">
              {{ homeSlides[activeSlide].title }}
            </h2>
            <h2 class="text-5xl font-semibold break-all">
              {{ homeSlides[activeSlide].title1 }}
            </h2>
          </div>
          <p style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
             class="text-lg mt-2 text-gray-300 break-after-allw-110">
            {{ homeSlides[activeSlide].text }}
          </p>
          <div class="flex items-center justify-between mt-8">
            <router-link :to="{name: `${homeSlides[activeSlide].routeName}`}" class="transition duration-500 hover:scale-108">
              <span style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
                    class="text-2xl font-medium text-gray-200 break-after-all border-b-2 cursor-pointer w-fit pb-1.5">
                {{ homeSlides[activeSlide].routeText }}
              </span>
            </router-link>
            <router-link :to="{name: `${homeSlides[activeSlide].routeName}`}" class="transition duration-500 hover:scale-108">
              <img :src="right_shop" alt="" class="w-18 cursor-pointer">
            </router-link>
          </div>
        </div>
        <img :src="homeSlides[activeSlide].url" alt="" class="opacity-75 rounded-r-2xl" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { filterProduct } from "@/features/use-navigation/model/filter-product.ts";
import { productStore } from "@/entities/product/model/product.store.ts";

import right_shop from '@/assets/icons/arrows/go-shop.svg'

const { activeSlide } = filterProduct();
const { homeSlides } = productStore();

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % homeSlides.length
  }, 8000)
})

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>

</style>