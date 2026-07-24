<script setup lang="ts">
const BASE_URL = `http://localhost:3000`

import { computed } from "vue";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { useGetProducts } from "../composables/getProducts.ts";
import { useAddProducts } from "../composables/useAddProducts.ts";
import { useDeleteProduct } from "../composables/useDeleteProduct.ts";

import like from '../../../app/assets/icons/nav/like.png'
import liked from '../../../app/assets/icons/nav/liked.png'
import del from '../../../app/assets/icons/delete.svg'

const { products } = productsStore();
const { deleteProduct } = useDeleteProduct();
const { toggleToFavorite } = useAddProducts();
const { getProductId } = useGetProducts();

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
          <router-link :to="{ name: '/products/ProductsInfoPage' }">
            <img :src="productPreview(product.id)" alt="" class="w-[335px] h-[314px] sm:h-[314px] xl:h-[400px]">
          </router-link>
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
          <img @click="deleteProduct(product.id)" :src="del" alt="" class="w-[30px]">
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