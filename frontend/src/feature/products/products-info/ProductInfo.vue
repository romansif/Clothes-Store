<script setup lang="ts">
import { productsStore } from "../../../../shared/composables/stores/products.store.ts";
import { productsForms } from "../../../../shared/composables/forms/products.forms.ts";

import like from '../../../../app/assets/icons/nav/like.png'

const userId = localStorage.getItem("userId");
const { createProductForm } = productsForms();
const { product, sizes, colors } = productsStore();
</script>

<template>
  <div class="flex flex-col mt-6 px-4 lg:mt-0">
    <div class="flex flex-col gap-3">
      <div class="flex items-center">
        <h1 class="font-medium">{{ product.title }} {{ product.category }}</h1>
        <img :src=like alt="" class="ml-auto">
      </div>
      <div class="flex items-center">
        <span class="text-sm font-medium text-gray-400">MRP incl. of all taxes</span>
        <span class="font-medium ml-auto">{{ product.price }}</span>
      </div>
    </div>
    <div class="mt-7 lg:w-[300px]">
      <span class="font-medium">{{ product.description }}</span>
    </div>
    <div class="flex flex-col mt-6 gap-6 ">
      <div class="flex flex-col gap-2">
        <span class="text-gray-400">Colors</span>
        <div class="flex justify-between lg:gap-5">
          <div v-for="color in colors" :key="color.name" :class="[color.color,
                createProductForm.color === color.name
                  ? 'scale-120 border-3 border-gray-500 w-[60px] h-[60px]'
                  : 'hover:scale-110 w-[60px] h-[60px]'
               ]" @click="createProductForm.color = color.name"></div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-gray-400">Size</span>
        <div class="flex justify-between lg:gap-5">
          <img v-for="size in sizes" :key="size.name" :src=size.url alt="" :class="[
                createProductForm.size === size.name
                  ? 'scale-120 border-3 border-gray-500 w-[60px] h-[60px]'
                  : 'hover:scale-110 w-[60px] border-3 border-gray-300']" @click="createProductForm.size = size.name">
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6 mt-6">
      <span class="text-gray-400 text-sm">FIND YOUR SIZE |  MEASUREMENT GUIDE</span>
      <router-link v-if="!userId" :to="{name: 'login'}">
        <button class="hidden bg-gray-300 font-medium text-sm py-4 w-full font-[Montserrat] lg:block cursor-pointer">ADD TO CART</button>
      </router-link>
      <button v-if="userId" class="hidden bg-gray-300 font-medium text-sm py-4 w-full font-[Montserrat] lg:block cursor-pointer">ADD TO CART</button>
    </div>
  </div>
</template>

<style scoped>

</style>