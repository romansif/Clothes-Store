<template>
  <div class="font-montserrat relative w-230 overflow-hidden rounded-2xl">
    <Transition name="slide" mode="out-in">
      <div :key="current.id" class="flex h-45 justify-between bg-black">
        <div style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))" class="flex w-70 flex-col justify-center gap-3 px-15">
          <h2 class="break-after-all text-2xl font-semibold text-gray-50">
            {{ t(current.title) }}
          </h2>
          <p class="mt-2 w-70 break-after-all text-sm text-gray-300">
            {{ t(current.text) }}
          </p>
        </div>
        <img :src="current.url" alt="" class="w-115 rounded-r-2xl opacity-90" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onMounted, onUnmounted } from "vue";
import { filterProduct } from "@/shared/lib/filter-product.ts";
import { homeSlides, mainSlides } from "@/widgets/home/model/slides.ts";

const { t } = useI18n()
const { activeSlide } = filterProduct();

const current = computed(() => homeSlides[activeSlide.value]);

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
