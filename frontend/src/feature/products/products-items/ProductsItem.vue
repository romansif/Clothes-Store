<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { useFavorites } from "@/feature/products/composables/use.favorites.ts";
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
            <img :src="productPreview(product.id, products)" alt="" :class="['w-[344.5px] h-[180px] sm:h-[314px] xl:h-[400px]',
              product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']" />
        </router-link>
        <span v-if="product.quantity === 0 || product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
          Out Of Stack
        </span>
        <img @click="toggleToFavorite(product.id, 'product', product.id)" :src="product.favorite ? liked : like" alt=""
             class="absolute top-0.5 left-31 w-[25px] cursor-pointer sm:w-[35px] sm:left-58.5 md:left-66.5 lg:left-58.5 xl:left-77">
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
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving my-items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>