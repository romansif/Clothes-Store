<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

import HeaderItem from "@/feature/home/header/header-items/HeaderItem.vue";

const { products } = productsStore();
const { vHorizontalScroll } = productsCover();
</script>

<template>
  <ul v-horizontal-scroll v-if="products.length > 0"
      class="flex gap-6 md:gap-10 overflow-x-auto cursor-grab active:cursor-grabbing whitespace-nowrap
              no-scrollbar lg:max-w-[1120px] w-full h-fit md:px-0">
    <HeaderItem />
  </ul>
</template>

<style scoped>

</style>