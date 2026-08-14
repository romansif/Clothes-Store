<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { useFavorites } from "@/feature/profile/composables/use.favorites.ts";
import { useCart } from "@/feature/profile/composables/use.cart.ts";
import { profile } from "@/shared/composables/profile.ts";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";

import del from '@/app/assets/icons/delete-close/delete.svg';
import square from '@/app/assets/icons/squares/square.png';
import update from '@/app/assets/icons/products/refresh.svg';
import like from '@/app/assets/icons/nav/like.png';
import liked from '@/app/assets/icons/nav/liked.png';
import check_square from '@/app/assets/icons/squares/check-square.png';

const { cart } = productsStore();
const { getProductId } = useProducts();
const { productPreview, pureColors } = productsCover();
const { toggleToFavorite } = useFavorites();
const { toggleDeleteChoice } = useProfileModals();
const { updateCartItem, checkCartItem } = useCart();
const { sizeClass, sizeUrl } = profile();

const refreshPage = () => {
  window.location.reload();
}
</script>

<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.productId)" v-for="product in cart" :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <div class="relative">
          <router-link :to="{ name: 'products/info' }">
            <img :src="productPreview(product.id, cart)" alt="" :class="['w-[335px] h-[314px] sm:h-[314px] xl:h-[400px]',
                product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']">
          </router-link>
          <span v-if="product.quantity === 0 || product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">Out Of Stack</span>
          <img @click="toggleToFavorite(product.id, 'cart', product.productId)" :src="product.favorite ? liked : like"
               alt="" class="absolute top-0.5 left-75.5 w-[32px] cursor-pointer">
        </div>
        <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
          {{ product.material }} {{ product.category }}
        </span>
        <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
          <span class="whitespace-normal">
            {{ product.title }}
          </span>
          <span>
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-15">
        <div class="flex flex-col gap-4">
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this cart product?', 'DELETE_CART_ITEM', product.id)"
               :src="del" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
          <img v-if="product.status === 'Availability'" @click="checkCartItem(product.id, product.productId, product)"
               :src="product.checked ? check_square : square" alt="" class="cursor-pointer w-[30px] transition duration-400 hover:scale-120">
        </div>
        <div class="flex flex-col gap-4">
          <img :src="sizeUrl(product.sizes)" :class="[sizeClass(product.sizes)]" alt="">
          <div class="w-[30px] h-[30px]" :title="pureColors(product.id, cart)?.hex"
               :style="{ background: pureColors(product.id, cart)?.hex || 'transparent' }"></div>
          <div class="flex flex-col border transition duration-400 hover:scale-120">
            <button @click="updateCartItem('add', product.id, product.status)"
                    class="border-b transition duration-400 hover:bg-zinc-300 cursor-pointer">+</button>
            <span class="text-sm border-b text-center">{{ product.quantity }}</span>
            <button @click="updateCartItem('away', product.id, product.status)"
                    class="border-b transition duration-400 hover:bg-zinc-300 cursor-pointer">-</button>
          </div>
          <img @click="refreshPage" :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>

</style>