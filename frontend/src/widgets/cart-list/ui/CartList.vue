<template>
  <ul class="flex flex-col overflow-y-auto gap-10 h-92.5 no-scrollbar w-81.25 sm:h-92.5
      md:w-full md:grid md:grid-cols-2 md:gap-30 lg:grid-cols-3 lg:gap-15 xl:grid-cols-2 xl:w-210 xl:h-117.5">
    <CartProduct v-for="product in cart"
                 :user="props.user"
                 :product="product"
                 :cart="cart"
                 :favorite="favorite"
                 @toggle-to-favorite="toggleFavorite({favorite, product})">
      <UseCartItemActions :product="product" :cart="cart" />
    </CartProduct>
  </ul>
</template>

<script setup lang="ts">
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { CartProduct } from "@/entities/cart-item";
import { UseCartItemActions } from "@/features/cart-item-action";
import type { User } from "@/entities/profile";

const { cart } = useCartData()
const { favorite } = useFavoriteData()
const { toggleFavorite } = useToggleFavorite()

const props = defineProps<{
  user: User | undefined
}>()
</script>
