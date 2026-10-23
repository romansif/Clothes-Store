<template>
  <div class="flex flex-col gap-15">
    <div class="flex flex-col gap-4">
      <DeleteCartItemButton :product="product" />
      <AddToOrder :product="product" />
    </div>
    <div class="flex flex-col gap-4">
      <img :src="sizeUrl(product.sizes)" :class="[sizeClass(product.sizes)]" alt="">
      <div class="w-7.5 h-7.5" :title="pureColors(product.id, cart)?.hex"
           :style="{ background: pureColors(product.id, cart)?.hex || 'transparent' }"></div>
      <UpdateQuantityItem :product="product" :cart="cart" />
      <img :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/product-helper";
import { sizeClass, sizeUrl } from "@/entities/cart-item/lib/cart-specific";
import { AddToOrder, DeleteCartItemButton, UpdateQuantityItem } from "@/features/cart-item-action";

import type { Product } from "@/shared";

defineProps<{
  product: Product
  cart: Product[]
}>();

import update from "@/assets/icons/products/refresh.svg";

const { pureColors } = productHelper();
</script>
