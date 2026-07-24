<script setup lang="ts">
const BASE_URL = `http://localhost:3000`

import { computed } from "vue";
import { productsStore } from "../../../../../shared/composables/stores/products.store.ts";
import { useDeleteProduct } from "../../../../products/composables/useDeleteProduct.ts";
import { useAddProducts } from "../../../../products/composables/useAddProducts.ts";

import del from "../../../../../app/assets/icons/delete.svg";
import update from "../../../../../app/assets/icons/update.svg";
import like from "../../../../../app/assets/icons/nav/like.png";
import liked from "../../../../../app/assets/icons/nav/liked.png";

const { favorite } = productsStore();
const { toggleToFavorite } = useAddProducts();
const { deleteFavoriteProduct } = useDeleteProduct();

const productPreview = computed(() => {
  return(id: string) => {
    if(!id){
      console.log('Id не найден')
      return
    }

    const product = favorite.value?.find(p => p.id === id)
    if(product && Array.isArray(product.images) && product.images[0]){
      return `${BASE_URL}/${product.images[0]}`
    }
  }
});

const refreshPage = () => {
  window.location.reload()
}
</script>

<template>
  <li v-for="product in favorite" :key="product.id" class="flex gap-5">
    <div class="flex flex-col">
      <div class="relative">
        <router-link :to="{ name: '/products/ProductsInfoPage' }">
          <img :src="productPreview(product.id)" alt="" class="w-full h-[314px] sm:h-[314px] xl:h-[400px]">
        </router-link>
        <img @click="toggleToFavorite(product.productId, 'favorite', product.productId)" :src="product.favorite ? liked : like" alt="" class="absolute top-0.5 left-75.5 w-[35px]">
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
    <div class="flex flex-col w-[30px] gap-5">
      <img @click="deleteFavoriteProduct(product.productId)" :src="del" alt="">
      <img @click="refreshPage()" :src="update" alt="">
    </div>
  </li>
</template>

<style scoped>

</style>