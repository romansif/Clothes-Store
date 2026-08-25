<template>
  <ul v-horizontal-scroll v-if="productsWeek.length > 0"
      class="flex gap-10 xl:gap-22.5 overflow-x-auto whitespace-nowrap no-scrollbar">
    <WeekItem />
  </ul>
  <div v-else class="flex justify-center p-15">
    <div class="flex flex-col gap-4 items-center">
      <span class="text-xl font-semibold">As of now, the new weekly releases have not yet appeared.</span>
      <span class="text-red-600 ">Or a glitch occurred: click to refresh.</span>
      <BaseButton name="Try again" variant="refresh" @click="getWeekProducts" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { productsWeek } = productStore();
const { getWeekProducts } = productApi();
const { vHorizontalScroll } = productsCover()

import { productStore } from "@/entities/product/model/product.store.ts";
import { productApi } from "@/feature/use-product/api/product.api.ts";
import { productsCover } from "@/feature/use-product/model/product-cover.ts";

import WeekItem from "@/feature/home/ui/WeekItem.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
</script>

<style scoped>

</style>