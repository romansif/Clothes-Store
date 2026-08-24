<template>
  <ul v-horizontal-scroll v-if="products.length > 0"
      class="flex gap-6 md:gap-10 overflow-x-auto cursor-grab whitespace-nowrap
              no-scrollbar lg:max-w-280 w-full h-fit md:px-0">
    <HeaderItem />
  </ul>
</template>

<script setup lang="ts">
const { products } = productStore();
const { vHorizontalScroll } = productsCover();

import { productsCover } from "@/shared/lib/product-cover.ts";
import { productStore } from "@/feature/products/model/product.store.ts";

import HeaderItem from "@/feature/home/ui/HeaderItem.vue";
</script>

<style scoped>

</style>