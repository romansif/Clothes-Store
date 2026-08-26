<template>
  <Transition name="view">
    <div v-if="products.length === 0" class="flex justify-center pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">There are currently no products in this category</span>
      </div>
    </div>
    <ul v-else class="font-raleway grid grid-cols-2 gap-5 overflow-y-auto max-h-132.5
       sm:max-h-197.5 sm:grid-cols-2 no-scrollbar sm:gap-8 md:gap-10 md:max-h-200 lg:grid-cols-3 xl:max-h-116 mt-5 xl:mt-0">
      <ProductItem />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
const { products } = productStore();

import { productStore } from "@/entities/product/model/product.store.ts";

import ProductItem from "./ProductItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";
</script>

<style scoped>

</style>