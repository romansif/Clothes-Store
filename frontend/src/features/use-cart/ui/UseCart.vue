<template>
  <div class="flex flex-col gap-15">
    <div class="flex flex-col gap-4">
      <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this cart product?', 'DELETE_CART_ITEM', product.productId)"
           :src="del" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
      <img :src="product.checked ? check_square : square" alt=""
           @click="checkCartItem(product.id, product)"
           class="cursor-pointer w-7.5 transition duration-400 hover:scale-120">
    </div>
    <div class="flex flex-col gap-4">
      <img :src="sizeUrl(product.sizes)" :class="[sizeClass(product.sizes)]" alt="">
      <div class="w-7.5 h-7.5" :title="pureColors(product.id, cart)?.hex"
           :style="{ background: pureColors(product.id, cart)?.hex || 'transparent' }"></div>
      <div class="flex flex-col border transition duration-400 hover:scale-120">
        <button @click="updateCartItem('add', product.productId)"
                class="border-b transition duration-400 hover:bg-zinc-300 cursor-pointer">+</button>
        <span class="text-sm border-b text-center font-dm-sans">{{ pureQuantity(product.id, cart)?.count }}</span>
        <button @click="updateCartItem('away', product.productId)"
                class="border-b transition duration-400 hover:bg-zinc-300 cursor-pointer">-</button>
      </div>
      <img :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import { sizeClass, sizeUrl } from "@/features/use-cart/lib/cart-specific.ts";
import type {Product} from "@/shared/model/product.types.ts";

defineProps<{
  product: Product;
  cart: Product[]
}>();

import del from "@/assets/icons/delete-close/delete.svg";
import check_square from "@/assets/icons/squares/check-square.png";
import square from "@/assets/icons/squares/square.png";
import update from "@/assets/icons/products/refresh.svg";

const { toggleDeleteChoice } = baseDeleteModal();
const { pureQuantity, pureColors } = productHelper();
const { updateCartItem, checkCartItem } = useUpdateCart();
</script>


<style scoped>

</style>