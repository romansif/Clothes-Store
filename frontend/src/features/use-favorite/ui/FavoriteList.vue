<template>
  <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-145 no-scrollbar sm:gap-5 sm:h-145 sm:grid sm:grid-cols-2
      md:w-full md:grid md:grid-cols-2 md:gap-x-30 md:gap-y-15 lg:h-142.5 lg:grid-cols-3 lg:gap-15
      xl:grid-cols-3 xl:gap-30 xl:w-full xl:h-117.5">
    <FavoriteItem v-for="product in favorite" :product="product" :favorite="favorite" />
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { favoriteStore } from "@/features/use-favorite/model/favorite.store.ts";

import FavoriteItem from "./FavoriteItem.vue";

const { favorite } = favoriteStore();
const { getFavoriteProducts } = useGetFavorite();

onMounted(async() => {
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>