<template>
  <Transition name="view">
    <div v-if="autumnCatalog.length === 0" class="pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">The seasonal selections is coming soon</span>
      </div>
    </div>
    <ul v-horizontal-scroll v-else class="flex gap-16.5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <AutumnItem />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { useGetProduct } from "@/features/use-all-product/api/get-product.ts";

import AutumnItem from "@/features/use-all-product/ui/season/autumn/AutumnItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";

const { autumnCatalog, vHorizontalScroll } = useGetProduct();
</script>

<style scoped>

</style>