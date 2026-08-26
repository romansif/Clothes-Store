<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { filterProduct } from "@/features/use-navigation/model/filter-product.ts";
import { productStore } from "@/entities/product/model/product.store.ts";

const { activeSlide } = filterProduct();
const { slides } = productStore();

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.length
  }, 6000)
})

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="relative overflow-hidden w-368">
    <Transition name="slide" mode="out-in">
      <div :key="slides[activeSlide].id" class="bg-black flex justify-between h-90">
        <div class=" flex flex-col justify-center gap-4 px-25">
          <div class="flex flex-col gap-1 text-gray-50
                [text-shadow:0_0_8px_rgba(255,255,255,1)] w-100">
            <h2 class="text-5xl font-semibold break-all">
              {{ slides[activeSlide].title }}
            </h2>
            <h2 class="text-5xl font-semibold break-all">
              {{ slides[activeSlide].title1 }}
            </h2>
          </div>
          <p class="text-lg mt-2 text-gray-300 break-after-all
              [text-shadow:0_0_10px_rgba(255,255,255,1)] w-110">
            {{ slides[activeSlide].text }}
          </p>
          <router-link :to="{name: `${slides[activeSlide].routeName}`}" class="mt-10">
            <span class="text-2xl font-medium text-gray-300 break-after-all
                   [text-shadow:0_0_10px_rgba(255,255,255,1)] border-b-2 cursor-pointer w-fit">
              {{ slides[activeSlide].routeText }}
            </span>
          </router-link>
        </div>
        <img :src="slides[activeSlide].url" alt="" class="opacity-75" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>

</style>