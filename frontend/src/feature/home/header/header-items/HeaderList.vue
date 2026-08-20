<template>
  <ul v-horizontal-scroll v-if="products.length > 0"
      class="flex gap-6 md:gap-10 overflow-x-auto cursor-grab whitespace-nowrap
              no-scrollbar lg:max-w-280 w-full h-fit md:px-0">
    <HeaderItem />
  </ul>
</template>

<script setup lang="ts">
const { products } = productsStore();
const { vHorizontalScroll } = productsCover();

import { productsCover } from "@/shared/composables/product.cover.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

import HeaderItem from "@/feature/home/header/header-items/HeaderItem.vue";
</script>

<style scoped>

</style>