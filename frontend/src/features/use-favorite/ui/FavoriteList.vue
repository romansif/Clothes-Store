<template>
  <div v-if="favorite.length === 0" class="flex flex-col gap-5 items-center justify-center pt-55">
    <img :src="favorite_cart" alt="">
    <div class="flex flex-col gap-2 items-center">
      <span class="font-bold">
        Favorite is empty
      </span>
      <span class="text-[#A3A3A3]">
        It’s the perfect time to look through the catalog and choose new clothes for the year.
      </span>
    </div>
  </div>
  <div v-else class="flex flex-col xl:flex-row xl:justify-between">
    <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-145 no-scrollbar sm:gap-5 sm:h-145 sm:grid sm:grid-cols-2
        md:w-full md:grid md:grid-cols-2 md:gap-x-30 md:gap-y-15 lg:h-142.5 lg:grid-cols-3 lg:gap-15
        xl:grid-cols-3 xl:gap-30 xl:w-full xl:h-117.5">
      <ProductCard v-for="product in favorite"
                    :user="userData"
                    :product="product"
                    :array="favorite"
                    :size="'w-83.75 h-45 sm:h-78.5 xl:h-100'"
                    :stack-class="'absolute top-41 -left-12 text-7xl font-semibold -rotate-50 w-110'"
                    :favorite-btn="'absolute top-0.5 left-75.5 w-8 cursor-pointer'"
                    @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { favoriteStore } from "@/entities/favorite/model/favorite.store.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";

import favorite_cart from "@/assets/icons/products/favorute_empty.svg";
import ProductCard from "@/entities/product-card/ui/ProductCard.vue";

const { userData } = userStore();
const { favorite } = favoriteStore();
const { toggleToFavorite } = useToggleFavorite();
</script>

<style scoped>

</style>