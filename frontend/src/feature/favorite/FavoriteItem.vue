<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useFavorites } from "@/feature/favorite/favorite-actions/use.favorites.ts";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";

import del from "@/app/assets/icons/delete-close/delete.svg";
import like from "@/app/assets/icons/nav/like.png";
import update from "@/app/assets/icons/products/refresh.svg";
import liked from "@/app/assets/icons/nav/liked.png";

const { favorite } = productsStore();
const { getProductId } = useProducts();
const { productPreview } = productsCover();
const { toggleToFavorite } = useFavorites();
const { toggleDeleteChoice } = useProfileModals();

const refreshPage = () => {
  window.location.reload();
}
</script>

<template>
  <TransitionGroup name="list">
    <li v-for="product in favorite" :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <div @click="getProductId(product.productId)" class="relative">
          <router-link :to="{ name: 'product/info' }">
            <img :src="productPreview(product.id, favorite)" alt="" :class="['w-83.75 h-45 sm:h-78.5 xl:h-100',
                product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']">
          </router-link>
          <span v-if="product.quantity === 0 || product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
            Out Of Stack
          </span>
          <img @click="toggleToFavorite(product.productId, 'favorite', product.productId)" :src="product.favorite ? liked : like"
               alt="" class="absolute top-0.5 left-75.5 w-8 cursor-pointer">
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
      <div class="flex flex-col w-7.5 gap-5">
        <img @click="toggleDeleteChoice(
            'Are you sure you want to delete this favorite product?', 'DELETE_FAVORITE_ITEM', product.productId)"
             :src="del" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
        <img @click="refreshPage()" :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>

</style>