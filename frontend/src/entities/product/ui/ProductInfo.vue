<template>
  <div class="flex flex-col mt-5 px-4 lg:mt-0 w-125">
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
        <img @click="toggleToFavorite(product.id, 'product', product.id)"
             :src="isFavorite(product.id, userData.id) ? liked : like" alt=""
             class="ml-auto w-8.75 h-8.75 cursor-pointer">
      </div>
      <div class="flex text-sm font-medium text-[#A3A3A3]">
        <span>
          MRP incl. of all taxes
        </span>
        <span class="ml-auto">{{ quantityInfo(product) }}</span>
      </div>
    </div>
    <div class="mt-5">
      <span class="font-medium">
        {{ product.description }}
      </span>
    </div>
    <div class="flex flex-col mt-5 gap-6">
      <div class="flex flex-col gap-2">
        <span class="font-medium text-[#A3A3A3]">
          Colors
        </span>
        <div class="flex justify-start items-center lg:gap-5">
          <div v-for="color in pureInfoColors(product)" :key="color.hex" :style="{ background: color.hex }" :title="color.hex"
               @click="addColor(color, userData)" :class="selectedColorClass(color, product, userData.role)"></div>
          </div>
          <span v-if=cartFormErrors.colorError class="text-red-600 text-xs">
            {{ cartFormMessages.colorMessage }}
          </span>
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-medium text-[#A3A3A3]">Sizes</span>
        <div class="flex justify-start items-center lg:gap-5">
          <img v-for="size in isAvailableSizes" :key="size.name" :src=size.url alt="" @click="addSize(size, userData)"
               :class="selectedSizesClass(size, product, userData.role)">
        </div>
        <span v-if=cartFormErrors.sizeError class="text-red-600 text-xs">
          {{ cartFormMessages.sizeMessage }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-8 mt-6">
      <button @click="toggleSizeGuide" class="text-[#A3A3A3] text-left transition duration-400 cursor-pointer hover:scale-105">
        What's my size?
      </button>
      <router-link v-if="!userData.id" :to="{name: 'signIn'}">
        <span class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center
            font-montserrat lg:block">
          ADD TO CART
        </span>
      </router-link>
      <BaseButton v-if="userData.role !== 'Seller' && product.quantity !== 0 && !isInCart" name="ADD TO CART" variant="addToCart"
                  @click="addToCart()" />
      <BaseButton v-if="isValidOutOfStack(product)" name="OUT OF STACK" variant="outOfStack" />
      <div v-if="userData.id && isInCart" class="flex items-center gap-18">
        <div class="flex gap-6 bg-zinc-800 py-4 px-3 text-lg transition duration-300 hover:scale-108">
          <img :src="plus" @click="updateCartItem('add', isInCart.id, isInCart.status)" alt=""
               class="bg-zinc-600 text-white px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
          <span class="text-white">{{ isInCart.quantity }}</span>
          <img :src="minus" @click="updateCartItem('away', isInCart.id, isInCart.status)" alt=""
               class="bg-zinc-600 text-white px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
        </div>
        <router-link :to="{ name: 'cart' }">
          <span class="bg-black text-white font-semibold py-4.5 px-19 font-[Montserrat]
              lg:block cursor-pointer text-start transition duration-400 transform hover:scale-108">Go to Cart</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userData } = userStore();
const { product } = productStore();
const { isFavorite } = useFavorite();
const { addColor, addSize } = useCart();
const { toggleToFavorite } = favoritesApi();
const { addToCart, updateCartItem } = cartApi();
const { cartFormErrors } = addToCartErrors();
const { toggleSizeGuide } = useProductsModals();
const { cartForm, cartFormMessages } = addToCartForm();
const { selectedColorClass, selectedSizesClass } = productsClasses();
const { isValidOutOfStack, pureInfoColors, isAvailableSizes, isInCart, quantityInfo } = productsCover();

import { watch } from "vue";
import { productsCover } from "@/features/use-product/model/product-cover.ts";
import { cartApi } from "@/features/use-cart/api/cart.api.ts";
import { useCart } from "@/features/use-cart/model/use-cart.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";
import { useFavorite } from "@/features/use-favorite/model/use-favorite.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { favoritesApi } from "@/features/use-favorite/api/favorites.api.ts";
import { productsClasses } from "@/shared/constants/product/products.classes.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import { addToCartErrors } from "@/features/use-cart/lib/cart.errors.ts";

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