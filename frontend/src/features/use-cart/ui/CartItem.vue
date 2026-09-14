<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <BaseProductCard :array="cart" :product="product"
                         :size="'w-83.75 h-45 sm:h-78.5 xl:h-100'"
                         :stack-class="'absolute top-41 -left-12 text-7xl font-semibold -rotate-50 w-110'"
                         :favorite-btn="'absolute top-0.5 left-75.5 w-8 cursor-pointer'" />
        <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
          {{ product.material }} {{ product.category }}
        </span>
        <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
          <span class="whitespace-normal">
            {{ product.title }}
          </span>
          <span class="font-dm-sans">
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-15">
        <div class="flex flex-col gap-4">
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this cart product?', 'DELETE_CART_ITEM', product.id)"
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
            <button @click="updateCartItem('add', product.id)"
                    class="border-b transition duration-400 hover:bg-zinc-300 cursor-pointer">+</button>
            <span class="text-sm border-b text-center font-dm-sans">{{ pureQuantity(product.id, cart)?.count }}</span>
            <button @click="updateCartItem('away', product.id)"
                    class="border-b transition duration-400 hover:bg-zinc-300 cursor-pointer">-</button>
          </div>
          <img @click="refreshPage" :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";
import { productHelper } from "@/features/use-product/lib/product.helper.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

defineProps<{
  product: Product;
  cart: Product[]
}>();

import del from '@/assets/icons/delete-close/delete.svg';
import square from '@/assets/icons/squares/square.png';
import update from '@/assets/icons/products/refresh.svg';
import check_square from '@/assets/icons/squares/check-square.png';
import BaseProductCard from "@/widgets/BaseProductCard.vue";

const { sizeClass, sizeUrl } = useProfile();
const { toggleDeleteChoice } = useProfileModals();
const { pureQuantity, pureColors } = productHelper();
const { updateCartItem, checkCartItem } = useUpdateCart();

const refreshPage = () => {
  window.location.reload();
}
</script>


<style scoped>

</style>