<template>
  <main class="mt-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <div v-if="favorite.length === 0" class="flex flex-col gap-5 items-center justify-center pt-55">
        <img :src="favorite_cart" alt="">
        <div class="flex flex-col gap-2 items-center">
          <span class="font-bold">Favorite is empty</span>
          <span class="text-[#A3A3A3]">
              It’s the perfect time to look through the catalog and choose new clothes for the year.
            </span>
        </div>
      </div>
      <div v-else class="flex flex-col xl:flex-row xl:justify-between">
        <FavoriteList />
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { favoriteStore } from "@/features/use-favorite/model/favorite.store.ts";

import favorite_cart from '@/assets/icons/products/favorute_empty.svg';
import FavoriteList from "@/features/use-favorite/ui/FavoriteList.vue";
import FavoriteCartHeader from "@/widgets/navigation/ui/FavoriteCartHeader.vue";

const { favorite } = favoriteStore();
const { getFavoriteProducts } = useGetFavorite();

onMounted(async() => {
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>