<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";

const { products } = productsStore();
const { getProductId } = useProducts();
const { productPreview } = productsCover();
</script>

<template>
  <li @click="getProductId(product.id)" v-for="product in products" :key="product.id" class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
    <router-link :to="{name: 'products/info'}">
      <img :src="productPreview(product.id, products)" alt="" :class="['w-full h-[200px] lg:h-[380px] md:h-[280px]',
            product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']" />
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

<style scoped>

</style>