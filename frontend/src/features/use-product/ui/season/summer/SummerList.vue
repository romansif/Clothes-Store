<template>
  <Transition name="view">
    <div v-if="summerCatalog.length === 0" class="pt-45">
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
import {useGetProduct} from "@/features/use-product/api/get-product.ts";

import SpringItem from "@/features/use-product/ui/season/spring/SpringItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";

const { summerCatalog, vHorizontalScroll } = useGetProduct();
</script>

<style scoped>

</style>