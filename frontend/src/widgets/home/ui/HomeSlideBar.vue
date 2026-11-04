<template>
  <div class="font-montserrat relative mt-12 w-full overflow-hidden rounded-2xl">
    <Transition name="slide" mode="out-in">
      <div :key="current.id" class="flex h-96 justify-between bg-black">
        <div style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))" class="flex flex-col justify-center gap-2 px-20">
          <div class="flex w-100 flex-col gap-1 text-gray-50">
            <div class="w-40 border-t-4 pb-6"></div>
            <h2 class="text-5xl font-semibold break-after-all">
              {{ t(current.title) }}
            </h2>
            <h2 v-if="current.title1" class="text-5xl font-semibold break-all">
              {{ t(current.title1) }}
            </h2>
          </div>
          <p class="break-after-allw-110 mt-2 text-lg text-gray-300">
            {{ t(current.text) }}
          </p>
          <div class="mt-8 flex w-110 items-center justify-between">
            <router-link v-if="current.routeText" :to="{ name: current.routeName }" class="transition duration-500 hover:scale-108">
                <span class="w-fit cursor-pointer break-after-all border-b-2 pb-1.5 text-2xl font-medium text-gray-200">
                  {{ t(current.routeText) }}
                </span>
            </router-link>
          </div>
        </div>
        <img :src="homeSlides[activeSlide].url" alt="" class="rounded-r-2xl opacity-75" />
      </div>
    </Transition>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onMounted, onUnmounted } from "vue";
import { filterProduct } from "@/widgets/filter-products/lib/filter-product";
import { homeSlides } from "@/widgets/home/model/slides";

const { t } = useI18n()
const { activeSlide } = filterProduct();

const current = computed(() => homeSlides[activeSlide.value]);

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
