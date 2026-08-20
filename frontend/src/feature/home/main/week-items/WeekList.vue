<template>
  <ul v-horizontal-scroll v-if="productsWeek.length > 0"
      class="flex gap-10 xl:gap-20 overflow-x-auto whitespace-nowrap no-scrollbar">
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
const { productsWeek } = productsStore();
const { getWeekProducts } = useProducts();
const { vHorizontalScroll } = productsCover()

import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { productsCover } from "@/shared/composables/product.cover.ts";

import WeekItem from "@/feature/home/main/week-items/WeekItem.vue";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
</script>

<style scoped>

</style>