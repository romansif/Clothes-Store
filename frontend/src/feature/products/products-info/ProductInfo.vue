<script setup lang="ts">
import {computed, watch} from "vue";
import { useAddProducts } from "../composables/useAddProducts.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { productsForms } from "../../../shared/composables/forms-composables/forms/products.forms.ts";
import { productsFormErrors } from "../../../shared/composables/forms-composables/forms-errors/products.errors.ts";

import like from '../../../app/assets/icons/nav/like.png'
import liked from '../../../app/assets/icons/nav/liked.png'
import BaseButton from "../../../shared/ui/button/BaseButton.vue";

const userId = localStorage.getItem("userId");

const { addCartFormErrors } = productsFormErrors();
const { product, sizes, colors } = productsStore();
const { addToCart, toggleToFavorite } = useAddProducts();
const { addToCartForm, addToCartFormMessages } = productsForms();

const isAvailableColors = computed(() => {
  if(!product.value.color){
    return ''
  }
  console.log()
  return colors.filter(color => product.value.color.includes(color.name))

})

const isAvailableSizes = computed(() => {
  if(!product.value.size){
    return ''
  }
  return sizes.filter(size => product.value.size.includes(size.name))
})

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
  <div class="flex flex-col mt-6 px-4 lg:mt-0">
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
        <div class="flex justify-between lg:gap-5">
          <div v-for="color in (isAvailableColors as any)" :key="color.name" :class="[color.color,
                addToCartForm.color === color.name
                  ? 'scale-120 border-3 border-black w-[60px] h-[60px]'
                  : 'hover:scale-110 w-[60px] h-[60px]'
               ]" @click="addToCartForm.color = color.name"></div>
        </div>
        <span v-if=addCartFormErrors.colorError class="text-red-600 text-xs">
          {{ addToCartFormMessages.colorMessage }}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-medium text-[#A3A3A3]">Size</span>
        <div class="flex justify-between lg:gap-5">
          <img v-for="size in (isAvailableSizes as any)" :key="size.name" :src=size.url alt="" :class="[size.class,
                addToCartForm.size === size.name
                  ? 'scale-120 border-black w-[60px] h-[60px]'
                  : 'hover:scale-110 w-[60px]']" @click="addToCartForm.size = size.name">
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
      <router-link v-if="!userId" :to="{name: '/auth/LoginPage'}">
        <span class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center font-[Montserrat] lg:block cursor-pointer">
          ADD TO CART
        </span>
      </router-link>
      <BaseButton @click="addToCart()" v-if="userId" name="ADD TO CART" variant="addToCart" />
    </div>
  </div>
</template>

<style scoped>

</style>