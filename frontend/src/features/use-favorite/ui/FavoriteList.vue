<template>
  <div class="flex flex-col xl:flex-row xl:justify-between">
    <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-145 no-scrollbar sm:gap-5 sm:h-145 sm:grid sm:grid-cols-2
        md:w-full md:grid md:grid-cols-2 md:gap-x-30 md:gap-y-15 lg:h-142.5 lg:grid-cols-3 lg:gap-15
        xl:grid-cols-3 xl:gap-30 xl:w-full xl:h-117.5">
      <ProductCard v-for="product in favorite"
                   :user="userData"
                   :product="product"
                   :array="favorite"
                   :variant="'main&favorite&Cart'"
                   @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { favoriteStore } from "@/entities/favorite/model/favorite.store.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";

import ProductCard from "@/entities/product-card/ui/ProductCard.vue";

const { userData } = userStore();
const { favorite } = favoriteStore();
const { toggleToFavorite } = useToggleFavorite();
</script>

<style scoped>

</style>