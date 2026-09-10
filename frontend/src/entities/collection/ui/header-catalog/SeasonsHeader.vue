<template>
  <header class="font-raleway flex justify-between">
    <template v-for="season in seasonsCatalog" :key="season.id">
      <div v-if="route.name === season.route" class="flex flex-col">
        <div class="flex flex-col">
          <div class="flex flex-col gap-2 items-center xl:items-start">
            <div class="font-semibold flex gap-2">
              <router-link :to="{ name: 'shop/seasons-catalog' }" class="text-[#A3A3A3]">
                Seasonal
              </router-link>
              <span>/</span>
              <span v-if="isNew">
                New
              </span>
              <span>
                {{ season.name }}
              </span>
            </div>
            <h1 v-if="isNew" class="text-4xl font-extrabold">
              NEW ARRIVALS
            </h1>
            <h1 class="text-4xl font-extrabold">
              {{ season.slogan }}
            </h1>
          </div>
          <span class="mt-15 text-xl text-[#A3A3A3]">
            {{ season.text }}
          </span>
        </div>
      </div>
    </template>
    <div class="flex flex-col h-10 sm:h-35 xl:h-53.75 gap-5 mt-12 xl:mt-0">
      <MainSlideBar />
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();

const { seasonsCatalog } = productStore();

import { computed } from "vue";
import { useRoute } from "vue-router";
import { productStore } from "@/entities/product/model/product.store.ts";

import MainSlideBar from "@/widgets/MainSlideBar.vue";

const isNew = computed(() => route.name === 'shop/new-collections')
</script>

<style scoped>

</style>