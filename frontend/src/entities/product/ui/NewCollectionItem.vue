<template>
  <TransitionGroup name="list" mode="out-in">
    <li @click="getProductId(product.id)" v-for="product in newCollections" :key="product.id" class="flex flex-col w-fit">
      <div class="relative">
        <router-link :to="{ name: 'product/info', params: { id: product.id } }">
          <img :src="productPreview(product.id, newCollections)" alt=""
               :class="productPreviewClass('w-87 h-45 sm:h-78.5 xl:h-100', product)" />
          <span v-if="isOutOfStack(product)" class="absolute w-100 top-40 -left-3 text-6xl font-semibold -rotate-50">
            Out Of Stack
          </span>
        </router-link>
        <img @click="toggleToFavorite(product.id, 'product', product.id)" :src="isFavorite(product.id, userData.id) ? liked : like" alt=""
             class="absolute top-0.5 left-31 w-6.25 cursor-pointer sm:w-8.75 sm:left-58.5 md:left-66.5 lg:left-58.5 xl:left-76.5">
      </div>
      <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-sm sm:text-lg">
        <span class="whitespace-normal w-20 sm:w-50">
          {{ product.title }}
        </span>
        <span font-dm-sans>
          $ {{ product.price }}
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { userData } = userStore();
const { isFavorite } = useFavorite();
const { newCollections } = productStore();
const { getProductId } = productApi();
const { productPreviewClass } = baseClasses();
const { toggleToFavorite } = favoritesApi();
const { isOutOfStack, productPreview } = productsCover();

import { userStore } from "@/entities/profile/model/user.store.ts";
import { useFavorite } from "@/features/use-favorite/model/use-favorite.ts";
import { baseClasses } from "@/shared/constants/base.classes.ts";
import { productsCover } from "@/features/use-product/model/product-cover.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { favoritesApi } from "@/features/use-favorite/api/favorites.api.ts";
import { productStore } from "@/entities/product/model/product.store.ts";

import like from '@/assets/icons/nav/like.png';
import liked from '@/assets/icons/nav/liked.png';
</script>

<style scoped>

</style>