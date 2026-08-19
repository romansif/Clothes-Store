<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.id)" v-for="product in productsYear" :key="product.id"
        class="flex flex-col shrink-0 lg:w-95 md:w-70 w-50">
      <router-link :to="{name: 'product/info'}">
        <img :src="productPreview(product.id, productsYear)" alt="" :class="['w-full h-50 lg:h-95 md:h-70',
              product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']">
      </router-link>
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
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";

const { productsYear } = productsStore();
const { getProductId } = useProducts();
const { productPreview } = productsCover();
</script>

<style scoped>

</style>