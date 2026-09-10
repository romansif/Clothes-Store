<template>
  <TransitionGroup name="list">
    <li @click="getProduct(product.id)" v-for="product in productsYear" :key="product.id"
        class="flex flex-col shrink-0 lg:w-95 md:w-70 w-50">
      <div class="relative">
        <router-link :to="{ name: 'product/info', params: { id: product.id } }">
          <img :src="productPreview(product.id, productsYear)" alt=""
               :class="productPreviewClass('w-full h-50 md:h-70 lg:h-105', product)">
          <span v-if="isOutOfStack(product)" class="absolute top-45 -left-7 text-7xl font-semibold -rotate-48">
              Out Of Stack
          </span>
        </router-link>
        <img @click="toggleToFavorite(product.id, 'product', product.id)"
             :src="isFavorite(product.id, userData.id) ? liked : like" alt=""
             class="absolute top-0.5 left-31 w-6.25 cursor-pointer sm:w-8.75 sm:left-58.5 md:left-66.5 lg:left-58.5 xl:left-86">
      </div>
      <span class="whitespace-normal mt-2 text-[#A3A3A3]">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-base">
        <span class="whitespace-normal">{{ product.title }}</span>
        <span class="font-dm-sans">$ {{ product.price }}</span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { useFavorite } from "@/features/use-favorite/lib/use-favorite.ts";

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";

const { userData } = userStore();
const { isFavorite } = useFavorite();
const { productPreviewClass } = baseClasses();
const { toggleToFavorite } = useToggleFavorite();
const { getProduct, isOutOfStack, productPreview, productsYear } = useGetProduct();
</script>

<style scoped>

</style>