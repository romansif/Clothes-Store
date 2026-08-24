<template>
  <li @click="getProductId(product.id)" v-for="product in products" :key="product.id"
      class="flex flex-col shrink-0 lg:w-95 md:w-70 w-50">
    <router-link :to="{name: 'product/info'}">
      <img :src="productPreview(product.id, products)" alt=""
           :class="productPreviewClass('w-full h-50 lg:h-95 md:h-70', product)" />
    </router-link>
    <span class="whitespace-normal mt-2 text-gray-500">
      {{ product.material }} {{ product.category }}
    </span>
    <div class="flex items-center justify-between font-medium text-base">
      <span class="whitespace-normal">{{ product.title }}</span>
      <span>$ {{ product.price }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
const { products } = productStore();
const { getProductId } = productsApi();
const { productPreview } = productsCover();
const { productPreviewClass } = baseClasses();

import { baseClasses } from "@/shared/constants/base.classes.ts";
import { productsCover } from "@/shared/lib/product-cover.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
</script>

<style scoped>

</style>