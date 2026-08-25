<template>
  <ul v-if="products.length > 0" class="font-[Montserrat] grid grid-cols-2 gap-5 overflow-y-auto max-h-132.5
     sm:max-h-197.5 sm:grid-cols-2 no-scrollbar sm:gap-8 md:gap-10 md:max-h-200 lg:grid-cols-3 xl:max-h-116 mt-5 xl:mt-0">
    <ProductItem />
  </ul>
  <div v-else class="flex justify-center pt-40">
    <div class="flex flex-col gap-4 items-center">
      <span class="text-xl font-semibold">As of now, the new weekly releases have not yet appeared.</span>
      <span class="text-red-600 ">Or a glitch occurred: click to refresh.</span>
      <BaseButton name="Try again" variant="refresh" @click="getAllProducts" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { products } = productStore();
const { getAllProducts } = productApi();

import { productStore } from "@/entities/product/model/product.store.ts";
import { productApi } from "@/feature/use-product/api/product.api.ts";

import ProductItem from "./ProductItem.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
</script>

<style scoped>

</style>