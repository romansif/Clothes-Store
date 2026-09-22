<template>
  <header class="flex flex-col">
    <div class="flex gap-14 items-center font-semibold text-sm">
      <router-link :to="{name: 'cart'}">
        <div class="flex items-center gap-2">
          <span :class="[isCart ? 'text-black' : 'text-[#A3A3A3]']">SHOPPING BAG</span>
          <span class="font-dm-sans">({{ cartCount }})</span>
        </div>
      </router-link>
      <div class="flex items-center gap-2">
        <img :src="liked" alt="" class="w-8.75">
        <router-link :to="{ name: 'favorite' }">
          <div class="flex items-center gap-2">
            <span :class="[isFavorite ? 'text-black' : 'text-[#A3A3A3]']">FAVORITES</span>
            <span class="font-dm-sans">({{ favoritesCount }})</span>
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFavorite } from "@/features/use-favorite/lib/use-favorite.ts";
import { useCartOrderInfo } from "@/features/use-cart/lib/cart-order-info.ts";

import liked from "@/assets/icons/nav/liked.png";

const route = useRoute();

const { favoritesCount } = useFavorite();
const { cartCount } = useCartOrderInfo();

const isCart = computed(() => route.name === "cart");
const isFavorite = computed(() => route.name === "favorite");
</script>


<style scoped>

</style>