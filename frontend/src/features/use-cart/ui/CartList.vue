<template>
  <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-92.5 no-scrollbar w-81.25 sm:h-92.5
      md:w-full md:grid md:grid-cols-2 md:gap-30 lg:grid-cols-3 lg:gap-15 xl:grid-cols-2 xl:w-210 xl:h-117.5">
    <CartItem v-for="product in cart"
              :user="userData"
              :product="product"
              :cart="cart"
              @toggle-to-favorite="toggleToFavorite" />
  </ul>
</template>

<script setup lang="ts">
import { cartStore } from "@/features/use-cart/model/cart.store";
import { userStore } from "@/features/use-profile/model/user.store";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite";

import { CartItem } from "@/features/use-cart";

const { cart } = cartStore();
const { userData } = userStore();
const { toggleToFavorite } = useToggleFavorite();
</script>
