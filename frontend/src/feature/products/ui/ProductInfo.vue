<template>
  <div class="flex flex-col mt-6 px-4 lg:mt-0 w-125">
    <div class="flex flex-col gap-2">
      <div class="flex">
        <div class="flex flex-col gap-2 mt-1">
          <h1 class="font-medium">
            {{ product.title }} {{ product.category }}
          </h1>
          <span class="font-medium">
            $ {{ product.price }}
          </span>
        </div>
        <img @click="toggleToFavorite(product.id, 'product', product.id)" :src="isFavorite(product.id) ? liked : like" alt=""
             class="ml-auto w-8.75 h-8.75">
      </div>
      <span class="text-sm font-medium text-[#A3A3A3]">
        MRP incl. of all taxes
      </span>
    </div>
    <div class="mt-5">
      <span class="font-medium">
        {{ product.description }}
      </span>
    </div>
    <div class="flex flex-col mt-5 gap-6 ">
      <div class="flex flex-col gap-2">
        <span class="font-medium text-[#A3A3A3]">
          Colors
        </span>
        <div class="flex justify-start items-center lg:gap-5">
          <div v-for="color in pureInfoColors(product)" :key="color.hex" :style="{ background: color.hex }" :title="color.hex"
               @click="cartForm.colors = { hex: color.hex, colorName: color.colorName }"
               :class="selectedColorClass(color, product, user)"></div>
          </div>
          <span v-if=cartFormErrors.colorError class="text-red-600 text-xs">
            {{ cartFormMessages.colorMessage }}
          </span>
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-medium text-[#A3A3A3]">Sizes</span>
        <div class="flex justify-start items-center lg:gap-5">
          <img v-for="size in (isAvailableSizes as any)" :key="size.name" :src=size.url alt=""
               @click="cartForm.sizes = size.name" :class="selectedSizesClass(size, product, user)">
        </div>
        <span v-if=cartFormErrors.sizeError class="text-red-600 text-xs">
          {{ cartFormMessages.sizeMessage }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-8 mt-6">
      <span class="text-[#A3A3A3] text-sm">
        FIND YOUR SIZE |  MEASUREMENT GUIDE
      </span>
      <router-link v-if="!user" :to="{name: 'signIn'}">
        <span class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center
            font-[Montserrat] lg:block">
          ADD TO CART
        </span>
      </router-link>
      <BaseButton @click="addToCart()" v-if="product.quantity !== 0 && !isInCart" name="ADD TO CART" variant="addToCart" />
      <BaseButton v-if="isValidOutOfStack(product)" name="OUT OF STACK" variant="outOfStack" />
      <div v-if="user && isInCart" class="flex items-center gap-18">
        <div class="flex gap-6 bg-zinc-800 py-4 px-3 text-lg rounded-md transition duration-300 hover:scale-108">
          <img :src="plus" @click="updateCartItem('add', isInCart.id, isInCart.status)" alt=""
               class="bg-zinc-600 text-white px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
          <span class="text-white">{{ isInCart.quantity }}</span>
          <img :src="minus" @click="updateCartItem('away', isInCart.id, isInCart.status)" alt=""
               class="bg-zinc-600 text-white px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
        </div>
        <router-link :to="{ name: 'cart' }">
          <span class="bg-black text-white font-semibold py-4 px-19 font-[Montserrat]
              lg:block cursor-pointer text-start transition duration-400 transform hover:scale-108">Go to Cart</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = usersStore();
const { product } = productStore();
const { isFavorite } = useFavorite();
const { toggleToFavorite } = favoritesApi();
const { addToCart, updateCartItem } = cartApi();
const { cartFormErrors } = addToCartErrors();
const { cartForm, cartFormMessages } = addToCartForm();
const { selectedColorClass, selectedSizesClass } = productsClasses();
const { isValidOutOfStack, pureInfoColors, isAvailableSizes, isInCart } = productsCover();

import { watch } from "vue";
import { productsCover } from "@/shared/lib/product-image.ts";
import { cartApi } from "@/feature/cart/api/cart.api.ts";
import { useFavorite } from "@/feature/favorite/lib/use-favorite.ts";
import { usersStore } from "@/feature/profile/model/users.store.ts";
import { favoritesApi } from "@/feature/favorite/api/favorites.api.ts";
import { productsClasses } from "@/shared/constants/products/products.classes.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { addToCartForm } from "@/feature/cart/model/cart.forms.ts";
import { addToCartErrors } from "@/feature/cart/lib/cart.errors.ts";

import plus from '@/assets/icons/products/plus.svg';
import minus from '@/assets/icons/products/minus.svg';
import like from '@/assets/icons/nav/like.png';
import liked from '@/assets/icons/nav/liked.png';
import BaseButton from "@/shared/ui/BaseButton.vue";

watch(() => [cartForm.value.colors, cartForm.value.sizes], ([color, size]) => {
  if(color){
    cartFormErrors.value.colorError = false
  }
  if(size){
    cartFormErrors.value.sizeError = false
  }

})
</script>

<style scoped>

</style>