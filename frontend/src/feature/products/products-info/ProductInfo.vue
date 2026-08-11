<script setup lang="ts">
import { watch } from "vue";
import { productsCover } from "@/shared/composables/product.cover.ts";

import { useCart } from "@/feature/products/composables/use.cart.ts";
import { useFavorites } from "@/feature/products/composables/use.favorites.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { productsForms } from "@/shared/composables/forms/products.forms";
import { productsFormErrors } from "@/shared/composables/errors/errors-messages/products.errors";

import plus from '@/app/assets/icons/products/plus.svg';
import minus from '@/app/assets/icons/products/minus.svg';
import like from '@/app/assets/icons/nav/like.png';
import liked from '@/app/assets/icons/nav/liked.png';
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";

const { product } = productsStore();
const { toggleToFavorite } = useFavorites();
const { addToCart, updateCartItem } = useCart();
const { addCartFormErrors } = productsFormErrors();
const { isAvailableSizes, isInCart } = productsCover();
const { addToCartForm, addToCartFormMessages } = productsForms();

const userId = localStorage.getItem("userId");

watch(() => [addToCartForm.value.color, addToCartForm.value.size], ([color, size]) => {
  if(color){
    addCartFormErrors.value.colorError = false
  }
  if(size){
    addCartFormErrors.value.sizeError = false
  }
})
</script>

<template>
  <div class="flex flex-col mt-6 px-4 lg:mt-0 w-[492px]">
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
        <img @click="toggleToFavorite(product.id, 'product', product.id)" :src="product.favorite ? liked : like" alt="" class="ml-auto w-[35px] h-[35px]">
      </div>
      <span class="text-sm font-medium text-[#A3A3A3]">
        MRP incl. of all taxes
      </span>
    </div>
    <div class="mt-5 lg:w-[300px]">
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
          <div v-for="hex in product.color" :key="hex" :class="['w-[60px] h-[60px]',
                addToCartForm.color === hex
                  ? 'scale-120'
                  : 'hover:scale-120 transition duration-400'
               ]" :style="{ background: hex }" :title="hex" @click="addToCartForm.color = hex"></div>
          </div>
        <span v-if=addCartFormErrors.colorError class="text-red-600 text-xs">
          {{ addToCartFormMessages.colorMessage }}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-medium text-[#A3A3A3]">Size</span>
        <div class="flex justify-start items-center lg:gap-5">
          <img v-for="size in (isAvailableSizes as any)" :key="size.name" :src=size.url alt="" :class="[size.class, 'w-[60px] h-[60px]',
                addToCartForm.size === size.name
                  ? 'scale-120'
                  : 'hover:scale-120 transition duration-400']" @click="addToCartForm.size = size.name">
        </div>
        <span v-if=addCartFormErrors.sizeError class="text-red-600 text-xs">
          {{ addToCartFormMessages.sizeMessage }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-8 mt-6">
      <span class="text-[#A3A3A3] text-sm">
        FIND YOUR SIZE |  MEASUREMENT GUIDE
      </span>
      <router-link v-if="!userId" :to="{name: 'signIn'}">
        <span class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center
            font-[Montserrat] lg:block cursor-pointer">
          ADD TO CART
        </span>
      </router-link>
      <BaseButton @click="addToCart()" v-if="userId && product.quantity !== 0 && !isInCart" name="ADD TO CART" variant="addToCart" />
      <BaseButton v-if="userId && product.quantity === 0" name="OUT OF STACK" variant="outOfStack" />
      <div v-if="userId && isInCart" class="flex items-center gap-18">
        <div class="flex gap-6 bg-zinc-800 py-3.5 px-3 text-lg rounded-md transition duration-300 hover:scale-108">
          <img :src="plus" @click="updateCartItem('add', isInCart.id, isInCart.status)"
               class="bg-zinc-600 text-white px-2 w-[35px] rounded-md transition duration-300 hover:bg-zinc-400" />
          <span class="text-white">{{ isInCart.quantity }}</span>
          <img :src="minus" @click="updateCartItem('away', isInCart.id, isInCart.status)"
               class="bg-zinc-600 text-white px-2 w-[35px] rounded-md transition duration-300 hover:bg-zinc-400" />
        </div>
        <router-link :to="{ name: 'cart' }">
          <span class="bg-black text-white font-semibold py-4 px-21 font-[Montserrat]
              lg:block cursor-pointer text-start transition duration-300 transform hover:scale-108">Go to Cart</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>