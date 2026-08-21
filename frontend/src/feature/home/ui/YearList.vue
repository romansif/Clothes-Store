<template>
  <ul v-horizontal-scroll v-if="productsYear.length > 0"
      class="flex gap-10 xl:gap-20 overflow-x-auto whitespace-nowrap no-scrollbar">
    <YearItem />
  </ul>
  <div v-else class="flex justify-center p-15">
    <div class="flex flex-col gap-4 items-center">
      <span class="text-xl font-semibold">As of now, this annual releases have not yet appeared.</span>
      <span class="text-red-600">Or a glitch occurred: click to refresh.</span>
      <BaseButton name="Try again" variant="refresh" @click="resetError" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { productsYear } = productStore();
const { vHorizontalScroll } = productsCover()

import { productStore } from "@/feature/products/model/product.store.ts"
import { productsCover } from "@/shared/lib/product-image.ts";

import YearItem from "@/feature/home/ui/YearItem.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";

const resetError = () => {
  window.location.reload();
}
</script>


<style scoped>

</style>