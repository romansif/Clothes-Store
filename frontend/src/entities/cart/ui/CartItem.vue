<template>
  <TransitionGroup name="list">
    <li @click="getProduct(product.productId)" v-for="product in cart" :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <div class="relative">
          <router-link :to="{ name: 'product/info', params: { id: product.id } }">
            <img :src="productPreview(product.id, cart)" alt=""
                 :class="productPreviewClass('w-83.75 h-78.5 sm:h-78.5 xl:h-100', product)">
            <span v-if="isOutOfStack(product)" class="absolute top-45 -left-5 text-6xl font-semibold -rotate-50 w-90">
              Out Of Stack
            </span>
          </router-link>
          <img @click="toggleToFavorite(product.id, 'cart', product.productId)"
               :src="isFavorite(product.productId, userData.id) ? liked : like" alt=""
               class="absolute top-0.5 left-75.5 w-8 cursor-pointer">
        </div>
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
const { userData } = userStore();
const { getProduct } = productApi();
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

import { userStore } from "@/entities/profile/model/user.store.ts";
import { useFavorite } from "@/features/use-favorite/model/use-favorite.ts";
import { productsCover } from "@/features/use-product/model/use-product.ts";
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { favoritesApi } from "@/features/use-favorite/api/favorites.api.ts";
import { cartApi } from "@/features/use-cart/api/cart.api.ts";
import { useProfile } from "@/features/use-profile/model/use-profile.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";

const refreshPage = () => {
  window.location.reload();
}
</script>


<style scoped>

</style>