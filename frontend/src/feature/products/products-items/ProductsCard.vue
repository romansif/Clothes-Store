<script setup lang="ts">
const BASE_URL = `http://localhost:3000`

import { computed } from "vue";
import { useGetProducts } from "../composables/getProducts.ts";
import { useAddProducts } from "../composables/useAddProducts.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

import like from '@/app/assets/icons/nav/like.png';
import liked from '@/app/assets/icons/nav/liked.png';

const { products } = productsStore();
const { getProductId } = useGetProducts();
const { toggleToFavorite } = useAddProducts();

const productPreview = computed(() => {
  return(id: string) => {
    if(!id){
      console.log('Id не найден');
      return;
    }

    const product = products.value?.find(p => p.id === id)
    if(product && Array.isArray(product.images) && product.images[0]){
      return `${BASE_URL}/${product.images[0]}`;
    }
  }
});
</script>

<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.id)" v-for="product in products" :key="product.id" class="flex flex-col flex-shrink-0">
      <div class="relative">
        <router-link :to="{ name: 'products/info' }">
          <img :src="productPreview(product.id)" alt="" :class="['w-full h-[180px] sm:h-[314px] xl:h-[400px]',
              product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']" />
        </router-link>
        <span v-if="product.quantity === 0 || product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
          Out Of Stack
        </span>
        <img @click="toggleToFavorite(product.id, 'product', product.id)" :src="product.favorite ? liked : like" alt=""
             class="absolute top-0.5 left-77 w-[35px] cursor-pointer">
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

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>