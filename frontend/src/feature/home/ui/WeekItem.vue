<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.id)" v-for="product in productsWeek" :key="product.id"
        class="flex flex-col shrink-0 lg:w-75 w-50">
      <div class="relative">
        <router-link :to="{name: 'product/info'}">
          <img :src="productPreview(product.id, productsWeek)" alt=""
               :class="productPreviewClass('w-full h-50 md:h-60 lg:h-85', product)" />
        </router-link>
        <span v-if="isOutOfStack(product)" class="absolute top-35 -left-2 text-5xl font-semibold -rotate-45">
            Out Of Stack
        </span>
        <img @click="toggleToFavorite(product.id, 'product', product.id)" :src="isFavorite(product.id, userData.id) ? liked : like" alt=""
             class="absolute top-0.5 left-31 w-6.25 cursor-pointer sm:w-8.75 sm:left-58.5 md:left-66.5 lg:left-58.5 xl:left-66">
      </div>
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
const { userData } = userStore();
const { productsWeek } = productStore();
const { getProductId } = productApi();
const { toggleToFavorite } = favoritesApi();
const { isFavorite } = useFavorite();
const { isOutOfStack, productPreview } = productsCover();
const { productPreviewClass } = baseClasses();

import { userStore } from "@/entities/profile/user.store.ts";
import { baseClasses } from "@/shared/constants/base.classes.ts";
import { productsCover } from "@/feature/product/model/product-cover.ts";
import { productApi } from "@/feature/product/api/product.api.ts";
import { productStore } from "@/entities/product/product.store.ts";
import { favoritesApi } from "@/feature/favorite/api/favorites.api.ts";
import { useFavorite } from "@/feature/favorite/model/use-favorite.ts";

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";
</script>

<style scoped>

</style>