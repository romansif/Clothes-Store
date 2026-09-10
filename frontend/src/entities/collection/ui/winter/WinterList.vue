<template>
  <Transition name="view">
    <div v-if="winterCatalog.length === 0" class="pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">The seasonal selections is coming soon</span>
      </div>
    </div>
    <ul v-horizontal-scroll v-else class="flex gap-16.5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <SpringItem />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
const { vHorizontalScroll } = productsCover();
const { winterCatalog } = productStore();

import { productsCover } from "@/features/use-product/model/use-product.ts";
import { productStore } from "@/entities/product/model/product.store.ts";

import SpringItem from "@/entities/collection/ui/spring/SpringItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";
</script>

<style scoped>

</style>