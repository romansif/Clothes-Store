<template>
  <header class="font-raleway flex gap-56">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <div class="flex flex-col gap-2 items-center xl:items-start">
          <div class="font-semibold flex gap-2">
            <router-link :to="{ name: 'shop' }" class="text-[#A3A3A3]">
              Shop
            </router-link>
            <span>/</span>
            <span v-if="isSeasonal">
              Seasonal
            </span>
            <span v-else>
              New
            </span>
          </div>
          <h1 v-if="isSeasonal" class="text-4xl font-extrabold">
            IN SEASONS
          </h1>
          <h1 v-else class="text-4xl font-extrabold">
            NEW ARRIVALS
          </h1>
        </div>
      </div>
      <span class="mt-15 text-xl text-[#A3A3A3]">Discover collections for every season</span>
    </div>
    <div class="flex flex-col h-10 sm:h-35 xl:h-53.75 gap-5 mt-12 xl:mt-0">
      <MainSlideBar />
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();

import { computed } from "vue";
import { useRoute } from "vue-router";

import MainSlideBar from "@/widgets/MainSlideBar.vue";

const isSeasonal = computed(() => route.name === "shop/seasonal-catalog");
</script>

<style scoped>

</style>