<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.productId)" v-for="product in cart" :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <div class="relative">
          <router-link :to="{ name: 'product/info' }">
            <img :src="productPreview(product.id, cart)" alt=""
                 :class="productPreviewClass('w-83.75 h-78.5 sm:h-78.5 xl:h-100', product)">
          </router-link>
          <span v-if="isOutOfStack(product)" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
            Out Of Stack
          </span>
          <img @click="toggleToFavorite(product.id, 'cart', product.productId)"
               :src="isFavorite(product.productId, userData.id) ? liked : like" alt="" class="absolute top-0.5 left-75.5 w-8 cursor-pointer">
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
          <img v-if="product.status === 'Availability'" :src="product.checked ? check_square : square" alt=""
               @click="checkCartItem(product.id, product.productId, product)"
               class="cursor-pointer w-7.5 transition duration-400 hover:scale-120">
        </div>
        <div class="flex flex-col gap-4">
          <img :src="sizeUrl(product.sizes)" :class="[sizeClass(product.sizes)]" alt="">
          <div class="w-7.5 h-7.5" :title="pureColors(product.id, cart)?.hex"
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

<script setup lang="ts">
const { cart } = cartStore();
const { userData } = usersStore();
const { getProductId } = productsApi();
const { isFavorite } = useFavorite();
const { sizeClass, sizeUrl } = useProfile();
const { toggleToFavorite } = favoritesApi();
const { toggleDeleteChoice } = useProfileModals();
const { updateCartItem, checkCartItem } = cartApi();
const { isOutOfStack, productPreview, pureColors } = productsCover();
const { productPreviewClass } = baseClasses();

import del from '@/assets/icons/delete-close/delete.svg';
import square from '@/assets/icons/squares/square.png';
import update from '@/assets/icons/products/refresh.svg';
import like from '@/assets/icons/nav/like.png';
import liked from '@/assets/icons/nav/liked.png';
import check_square from '@/assets/icons/squares/check-square.png';

import { usersStore } from "@/feature/profile/model/users.store.ts";
import { useFavorite } from "@/feature/favorite/lib/use-favorite.ts";
import { productsCover } from "@/shared/lib/product-cover.ts";
import { cartStore } from "@/feature/cart/model/cart.store.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { favoritesApi } from "@/feature/favorite/api/favorites.api.ts";
import { cartApi } from "@/feature/cart/api/cart.api.ts";
import { useProfile } from "@/shared/lib/use-profile.ts";
import { useProfileModals } from "@/feature/profile/lib/profile.modals.ts";
import { baseClasses } from "@/shared/constants/base.classes.ts";

const refreshPage = () => {
  window.location.reload();
}
</script>


<style scoped>

</style>