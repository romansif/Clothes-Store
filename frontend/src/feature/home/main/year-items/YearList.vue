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
import { productsStore } from "@/shared/composables/stores/products.store.ts"
import { productsCover } from "@/shared/composables/product.cover.ts";

import YearItem from "@/feature/home/main/year-items/YearItem.vue";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";

const { productsYear } = productsStore();
const { vHorizontalScroll } = productsCover()

const resetError = () => {
  window.location.reload();
}
</script>


<style scoped>

</style>