<template>
  <TransitionGroup name="notify">
    <li @click="getProductId(product.id)" v-for="product in productsWeek" :key="product.id"
        class="flex flex-col shrink-0 lg:w-75 w-50">
      <router-link :to="{name: 'product/info'}">
        <img :src="productPreview(product.id, productsWeek)" alt="" :class="['w-full h-50 md:h-60 lg:h-78.25',
              product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']" />
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

const { productsWeek } = productsStore();
const { getProductId } = useProducts();
const { productPreview } = productsCover();
</script>

<style scoped>

</style>