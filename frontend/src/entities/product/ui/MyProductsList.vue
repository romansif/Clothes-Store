<template>
  <Transition name="view">
    <div v-if="myProducts.length === 0" class="flex justify-center pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">You haven't created a product cover for sale yet</span>
      </div>
    </div>
    <ul v-else class="font-raleway flex flex-col overflow-y-auto gap-20 max-h-175 no-scrollbar">
      <MyProductItem />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
const { myProducts } = productStore();

import { productStore } from "@/entities/product/model/product.store.ts";

import MyProductItem from "@/entities/product/ui/MyProductItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";
</script>

<style scoped>

</style>