<template>
  <main class="mt-10 xl:mt-30 xl:px-10">
    <header class="flex flex-col">
      <div class="flex gap-14 items-center font-semibold text-sm">
        <router-link :to="{name: 'cart'}">
            <span class="text-[#A3A3A3]">
              SHOPPING BAG <span class="font-dm-sans">({{ cartCount }})</span>
            </span>
        </router-link>
        <div class="flex items-center gap-2">
          <img :src="liked" alt="" class="w-8.75">
          <router-link :to="{name: 'favorite'}">
              <span>
                FAVORITES <span class="font-dm-sans">({{ favoritesCount }})</span>
              </span>
          </router-link>
        </div>
      </div>
    </header>
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
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { favoriteStore } from "@/features/use-favorite/model/favorite.store.ts";

import liked from "@/assets/icons/nav/liked.png";
import favorite_cart from '@/assets/icons/products/favorute_empty.svg';
import FavoriteList from "@/features/use-favorite/ui/FavoriteList.vue";

const { favorite } = favoriteStore();
const { cartCount, favoritesCount } = useProfile();

</script>

<style scoped>

</style>