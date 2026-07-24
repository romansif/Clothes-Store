<script setup lang="ts">
import { onMounted } from "vue";
import { useFilter } from "./composables/useFilter.ts";
import { useGetProducts } from "../composables/getProducts.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";

import availability from '../../../app/assets/icons/arrows/arrow-up.png'
import checked from '../../../app/assets/icons/check-square.png'
import square from '../../../app/assets/icons/square.png'

const { sizes } = productsStore();
const { getAllProducts, getFilteredProducts } = useGetProducts();
const {
  toggleAvailability, toggleGender, toggleColor,
  isAvailability, isOutOfStack, isMan, isWoman, isKids,
  inStackCount, outOfStackCount, inMan, inWoman, inKids,
  isWhite, isBlack, isBurgundy, isRed, isBlue, isGreen
} = useFilter();

onMounted(async() => {
  await getAllProducts();
})
</script>

<template>
  <aside class="font-[Montserrat] hidden mt-32.5 xl:flex xl:flex-col">
    <span class="font-bold text-xl">Filters</span>
    <div class="flex flex-col mt-5.5">
      <span class="font-medium">Size</span>
      <div class="flex items-center mt-2 gap-2">
        <img v-for="size in sizes" :key="size.name" :src=size.url alt="" @click="getFilteredProducts('SIZE', `${size.name}`)" :class="[size.class, 'w-[40px]']">
      </div>
    </div>
    <div class="border-b-1 border-gray-400 mt-3.5"></div>
    <div class="flex flex-col gap-2 mt-3.5">
      <div class="flex items-center font-medium">
        <span class="font-bold">Availability</span>
        <img :src=availability alt="" class="ml-auto">
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-3">
          <img @click="toggleAvailability('Availability')" :src="isAvailability ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Availability</span>
            <span>(<span class="text-blue-700 font-medium">{{ inStackCount.length }}</span>)</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleAvailability('Out Of Stack')" :src="isOutOfStack ? checked : square " alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Out Of Stack</span>
            <span>(<span class="text-blue-700 font-medium">{{ outOfStackCount.length }}</span>)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b-1 border-gray-400 mt-3.5"></div>
    <div class="flex flex-col gap-2 mt-3.5">
      <div class="flex items-center font-medium">
        <span class="font-bold">Gender</span>
        <img :src=availability alt="" class="ml-auto">
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-3">
          <img @click="toggleGender('Man')" :src="isMan ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Man</span>
            <span>(<span class="text-blue-700 font-medium">{{ inMan.length }}</span>)</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleGender('Woman')" :src="isWoman ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Woman</span>
            <span>(<span class="text-blue-700 font-medium">{{ inWoman.length }}</span>)</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleGender('Kids')" :src="isKids ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Kids</span>
            <span>(<span class="text-blue-700 font-medium">{{ inKids.length }}</span>)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b-1 border-gray-400 mt-3.5"></div>
    <div class="flex flex-col gap-2 mt-3.5">
      <div class="flex items-center font-medium">
        <span class="font-bold">Color</span>
        <img :src=availability alt="" class="ml-auto">
      </div>
      <div class="grid grid-cols-2 gap-y-2 gap-x-6">
        <div class="flex gap-3">
          <img @click="toggleColor('White')" :src="isWhite ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>White</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleColor('Red')" :src="isRed ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Red</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleColor('Black')" :src="isBlack ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Black</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleColor('Blue')" :src="isBlue ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Blue</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleColor('Rose')" :src="isBurgundy ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Burgundy</span>
          </div>
        </div>
        <div class="flex gap-3">
          <img @click="toggleColor('Green')" :src="isGreen ? checked : square" alt="" class="w-[23px] h-[23px]">
          <div class="flex gap-1">
            <span>Green</span>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b-1 border-gray-400 mt-3.5"></div>
  </aside>
</template>

<style scoped>

</style>