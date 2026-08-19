<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { useFavorites } from "@/feature/favorite/favorite-actions/use.favorites.ts";
import { productsStore } from "@/shared/composables/stores/products.store";

import like from '@/app/assets/icons/nav/like.png';
import liked from '@/app/assets/icons/nav/liked.png';

const { products } = productsStore();
const { getProductId } = useProducts();
const { productPreview } = productsCover();
const { toggleToFavorite } = useFavorites();

</script>

<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.id)" v-for="product in products" :key="product.id" class="flex flex-col">
      <div class="relative">
        <router-link :to="{ name: 'products/info' }">
            <img :src="productPreview(product.id, products)" alt="" :class="['w-[344.5px] h-45 sm:h-78.5 xl:h-100',
              product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']" />
        </router-link>
        <span v-if="product.quantity === 0 || product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
          Out Of Stack
        </span>
        <img @click="toggleToFavorite(product.id, 'product', product.id)" :src="product.favorite ? liked : like" alt=""
             class="absolute top-0.5 left-31 w-6.25 cursor-pointer sm:w-8.75 sm:left-58.5 md:left-66.5 lg:left-58.5 xl:left-77">
      </div>
      <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-sm sm:text-lg">
        <span class="whitespace-normal w-20 sm:w-50">
          {{ product.title }}
        </span>
        <span>
          $ {{ product.price }}
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>

</style>