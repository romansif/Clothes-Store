<template>
  <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-92.5 no-scrollbar w-81.25 sm:h-92.5
      md:w-full md:grid md:grid-cols-2 md:gap-30 lg:grid-cols-3 lg:gap-15 xl:grid-cols-2 xl:w-210 xl:h-117.5">
    <CartItem v-for="product in cart" :product="product" :cart="cart"/>
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";

import CartItem from "./CartItem.vue";

const { cart } = cartStore();
const { getCartProducts } = useGetCart();
const { getFavoriteProducts } = useGetFavorite();

onMounted(async () => {
  await getCartProducts();
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>