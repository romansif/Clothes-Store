<template>
  <div class="flex flex-col gap-15">
    <div class="flex flex-col gap-4">
      <DeleteCartItemButton :product="props.product" />
      <AddToOrder :product="props.product" :cart="props.cart" />
    </div>
    <div class="flex flex-col gap-4">
      <img :src="sizeUrl(props.product.sizes)" :class="[sizeClass(props.product.sizes)]" alt="" />
      <div
        class="h-7.5 w-7.5"
        :title="pureColors(props.product.id, props.cart)?.hex"
        :style="{ background: props.product.color.hex || 'transparent' }"
      ></div>
      <UpdateQuantityItem :product="props.product" :cart="props.cart" />
      <img :src="reload" alt="" class="cursor-pointer transition duration-400 hover:scale-120" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/product-helper";
import { sizeClass, sizeUrl } from "@/entities/cart-item/lib/cart-specific";
import { AddToOrder, DeleteCartItemButton, UpdateQuantityItem } from "@/features/cart-item-action";
import type { CartItem } from "@/entities/cart-item";

import reload from "@/assets/icons/app/reload.svg";

const props = defineProps<{
  product: CartItem;
  cart: CartItem[];
}>();

const { pureColors } = productHelper();
</script>
