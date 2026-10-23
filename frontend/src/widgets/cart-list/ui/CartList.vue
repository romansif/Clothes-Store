<template>
  <ul class="flex flex-col overflow-y-auto gap-10 h-92.5 no-scrollbar w-81.25 sm:h-92.5
      md:w-full md:grid md:grid-cols-2 md:gap-30 lg:grid-cols-3 lg:gap-15 xl:grid-cols-2 xl:w-210 xl:h-117.5">
    <CartProduct v-for="product in cart"
              :user="userData"
              :product="product"
              :cart="cart"
              @toggle-to-favorite="toggleToFavorite">
      <UseCartItemActions :product="product" :cart="cart" />
    </CartProduct>
  </ul>
</template>

<script setup lang="ts">
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { userStore } from "@/shared/model/user.store";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";

import { CartProduct } from "@/entities/cart-item";
import { UseCartItemActions } from "@/features/cart-item-action";

const { cart } = cartStore();
const { userData } = userStore();
const { toggleToFavorite } = useToggleFavorite();
</script>
