<script setup lang="ts">
import { useProductsModals } from "@/shared/composables/modals/products.modals";

import square from "@/app/assets/icons/squares/square.png";
import availability from "@/app/assets/icons/arrows/arrow-up.png";
import left_arrow from "@/app/assets/icons/arrows/left-arrow.png";
import checked from '@/app/assets/icons/squares/check-square.png'

import { onMounted } from "vue";
import { filtered } from "@/feature/products/products-header/composables/filtered.ts";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";


const { getAllProducts } = useProducts();
const { allProducts, sizes } = productsStore();
const { toggleFilterAside } = useProductsModals();
const { toggleFilter, toggleSize, stackProducts, genders, colors } = filtered();

onMounted(async() => {
  await getAllProducts();
})

</script>

<template>
  <aside class="fixed inset-0 z-50">
    <div class="font-[Montserrat] flex flex-col h-screen bg-white px-6 py-6 sm:w-[305px] md:w-[330px]">
      <div class="flex gap-5 items-center" @click=toggleFilterAside>
        <span class="font-bold text-xl">Filters</span>
        <img :src=left_arrow alt="">
      </div>
      <div class="flex flex-col mt-6 sm:mt-20">
        <span class="font-medium">Size</span>
        <div class="flex gap-4 sm:gap-1 mt-5.5 md:gap-2">
          <img v-for="size in sizes" :key="size.name" :src=size.url alt=""
               @click="toggleSize('SIZE', `${size.name}`)"
               :class="[size.class, 'w-[40px] transition duration-400 hover:scale-120 cursor-pointer', size.isActive ? 'scale-120' : '']">
        </div>
      </div>
      <div class="border-b border-gray-400 mt-3.5 sm:mt-5"></div>
      <div class="flex flex-col gap-2 mt-3.5">
        <div class="flex items-center font-medium">
          <span class="font-bold">Availability</span>
          <img :src=availability alt="" class="ml-auto">
        </div>
        <div class="flex flex-col gap-2">
          <div v-for="(isActive, stackName) in stackProducts" class="flex gap-3">
            <img @click="toggleFilter('STATUS', stackName)" :src="isActive ? checked : square"
                 alt="" :class="['w-[23px] h-[23px] transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : '']">
            <div class="flex gap-1">
              <span>{{ stackName }}</span>
              <span>
              (<span class="text-blue-700 font-medium">
                {{ allProducts.filter(p => p.status === stackName).length }}
              </span>)
            </span>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-400 mt-3.5"></div>
      <div class="flex flex-col gap-2 mt-3.5">
        <div class="flex items-center font-medium">
          <span class="font-bold">Gender</span>
          <img :src=availability alt="" class="ml-auto">
        </div>
        <div class="flex flex-col gap-2">
          <div v-for="(isActive, genderName) in genders" class="flex gap-3">
            <img @click="toggleFilter('GENDER', genderName)" :src="isActive ? checked : square"
                 alt="" :class="['w-[23px] h-[23px] transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : '']">
            <div class="flex gap-1">
              <span>{{ genderName }}</span>
              <span>
              (<span class="text-blue-700 font-medium">
                {{ allProducts.filter(p => p.gender === genderName).length }}
              </span>)
            </span>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-400 mt-3.5"></div>
      <div class="flex flex-col gap-2 mt-3.5">
        <div class="flex items-center font-medium">
          <span class="font-bold">Color</span>
          <img :src=availability alt="" class="ml-auto">
        </div>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6">
          <div v-for="(isActive, colorName) in colors" :key="colorName" class="flex gap-3">
            <img @click="toggleFilter('COLOR', colorName)" :src="isActive ? checked : square"
                 alt="" :class="['w-[23px] h-[23px] transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : '']">
            <div class="flex gap-1">
              <span>{{ colorName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-400 mt-3.5"></div>
    </div>
  </aside>
</template>

<style scoped>

</style>