<template>
  <img :src="product.checked ? check_square : square" alt=""
       @click="checkCartItem(product.id, product, cart)"
       class="cursor-pointer w-7.5 transition duration-400 hover:scale-120">
</template>

<script setup lang="ts">
import { checkCartItem } from "@/features/cart-item-action/api/add-to-order";
import type { Product } from "@/shared";
import type { CartItem } from "@/entities/cart-item";

import check_square from "@/assets/icons/squares/check-square.png";
import square from "@/assets/icons/squares/square.png";

defineProps<{
  product: Product;
  cart: CartItem[]
}>()
</script>
