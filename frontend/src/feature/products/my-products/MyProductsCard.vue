<script setup lang="ts">
const BASE_URL = `http://localhost:3000`

import { computed } from "vue";
import { useGetProducts } from "../composables/getProducts.ts";
import { useAddProducts } from "../composables/useAddProducts.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useProfileModals } from "@/shared/composables/modals/profile/profileModals.ts";

import del from '@/app/assets/icons/delete.svg'
import like from '@/app/assets/icons/nav/like.png'
import liked from '@/app/assets/icons/nav/liked.png'

const { products } = productsStore();
const { getProductId } = useGetProducts();
const { toggleToFavorite } = useAddProducts();
const { toggleDeleteChoice } = useProfileModals();

const productPreview = computed(() => {
  return(id: string) => {
    if(!id){
      console.log('Id не найден')
      return
    }

    const product = products.value?.find(p => p.id === id)
    if(product && Array.isArray(product.images) && product.images[0]){
      return `${BASE_URL}/${product.images[0]}`
    }
  }
});
</script>

<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.productId)" v-for="product in products" :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <div class="relative">
          <router-link :to="{ name: 'products/info' }">
            <img :src="productPreview(product.id)" alt="" :class="['w-[335px] h-[314px] sm:h-[314px] xl:h-[400px]',
                product.status === 'Availability' ? '' : 'opacity-40']">
          </router-link>
          <span v-if="product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">Out Of Stack</span>
          <img @click="toggleToFavorite(product.id, 'cart', product.productId)" :src="product.favorite ? liked : like"
               alt="" class="absolute top-0.5 left-75.5 w-[32px]">
        </div>
        <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
          {{ product.material }} {{ product.category }}
        </span>
        <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
          <span class="whitespace-normal">
            {{ product.title }}
          </span>
          <span>
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-15">
        <div class="flex flex-col gap-4">
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this product?', 'DELETE_PROUCT_ITEM', product.id
              )" :src="del" alt="" class="w-[30px] transition duration-400 hover:scale-120">
        </div>
        <div class="flex flex-col gap-4">

        </div>
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