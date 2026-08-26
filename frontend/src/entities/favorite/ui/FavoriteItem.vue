<template>
  <TransitionGroup name="list">
    <li v-for="product in favorite" :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <div @click="getProductId(product.productId)" class="relative">
          <router-link :to="{ name: 'product/info' }">
            <img :src="productPreview(product.id, favorite)" alt=""
                 :class="productPreviewClass('w-83.75 h-45 sm:h-78.5 xl:h-100', product)">
          </router-link>
          <span v-if="isOutOfStack(product)" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
            Out Of Stack
          </span>
          <img @click="toggleToFavorite(product.productId, 'favorite', product.productId)"
               :src="isFavorite(product.productId, userData.id) ? liked : like" alt=""
               class="absolute top-0.5 left-75.5 w-8 cursor-pointer">
        </div>
        <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
          {{ product.material }} {{ product.category }}
        </span>
        <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
          <span class="whitespace-normal">
            {{ product.title }}
          </span>
          <span class="font-dm-sans">
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <div class="flex flex-col w-7.5 gap-5">
        <img @click="refreshPage()" :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { userData } = userStore();
const { favorite } = favoriteStore();
const { isFavorite } = useFavorite();
const { getProductId } = productApi();
const { toggleToFavorite } = favoritesApi();
const { productPreviewClass } = baseClasses();
const { isOutOfStack, productPreview } = productsCover();

import { useFavorite } from "@/features/use-favorite/model/use-favorite.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { productsCover } from "@/features/use-product/model/product-cover.ts";
import { baseClasses } from "@/shared/constants/base.classes.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { favoriteStore } from "@/entities/favorite/model/favorite.store.ts";
import { favoritesApi } from "@/features/use-favorite/api/favorites.api.ts";

import like from "@/assets/icons/nav/like.png";
import update from "@/assets/icons/products/refresh.svg";
import liked from "@/assets/icons/nav/liked.png";

const refreshPage = () => {
  window.location.reload();
}
</script>

<style scoped>

</style>