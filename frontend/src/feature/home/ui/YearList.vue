<template>
  <ul v-horizontal-scroll v-if="productsYear.length > 0"
      class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar">
    <YearItem />
  </ul>
  <div v-else class="flex justify-center p-15">
    <div class="flex flex-col gap-4 items-center">
      <span class="text-xl font-semibold">As of now, this annual releases have not yet appeared.</span>
      <span class="text-red-600">Or a glitch occurred: click to refresh.</span>
      <BaseButton name="Try again" variant="refresh" @click="getYearProducts" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { productsYear } = productStore();
const { getYearProducts } = productApi();
const { vHorizontalScroll } = productsCover()

import { productStore } from "@/feature/product/model/product.store.ts"
import { productApi } from "@/feature/product/api/product.api.ts";
import { productsCover } from "@/shared/lib/product-cover.ts";

import YearItem from "@/feature/home/ui/YearItem.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
</script>


<style scoped>

</style>