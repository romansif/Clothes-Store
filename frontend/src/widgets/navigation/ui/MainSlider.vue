<template>
  <div class="relative overflow-hidden w-230">
    <Transition name="slide" mode="out-in">
      <div :key="mainSlides[activeSlide].id" class="bg-black flex justify-between h-45 rounded-2xl">
        <div style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
             class="flex flex-col justify-center gap-3 px-15 w-100">
          <h2 class="text-2xl font-semibold text-gray-50 break-after-all">
            {{ mainSlides[activeSlide].title }}
          </h2>
          <p class="text-sm mt-2 text-gray-300 break-after-all w-70">
            {{ mainSlides[activeSlide].text }}
          </p>
        </div>
        <img :src="mainSlides[activeSlide].url" alt="" class="w-115 opacity-90 rounded-r-2xl" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { filterProduct } from "@/features/use-navigation/model/filter-product.ts";
import { productStore } from "@/entities/product/model/product.store.ts";

const { activeSlide } = filterProduct();
const { mainSlides } = productStore();

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % mainSlides.length
  }, 4000)
})

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>

</style>