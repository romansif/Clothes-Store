<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.id)" v-for="product in productsYear" :key="product.id"
        class="flex flex-col shrink-0 lg:w-95 md:w-70 w-50">
      <div class="relative">
        <router-link :to="{name: 'product/info'}">
          <img :src="productPreview(product.id, productsYear)" alt=""
               :class="productPreviewClass('w-full h-50 lg:h-95 md:h-70', product)">
        </router-link>
        <span v-if="isOutOfStack(product)" class="absolute top-40 -left-2 text-6xl font-semibold -rotate-45">
            Out Of Stack
        </span>
      </div>
      <span class="whitespace-normal mt-2 text-[#A3A3A3]">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-base">
        <span class="whitespace-normal">{{ product.title }}</span>
        <span>$ {{ product.price }}</span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { productsYear } = productsStore();
const { getProductId } = useProducts();
const { isOutOfStack, productPreview } = productsCover();
const { productPreviewClass } = baseClasses();

import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { baseClasses } from "@/shared/composables/style/base.classes.ts";
</script>

<style scoped>

</style>