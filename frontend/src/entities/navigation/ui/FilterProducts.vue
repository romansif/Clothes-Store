<template>
  <aside class="font-[Montserrat] hidden mt-32.5 xl:flex xl:flex-col">
    <span class="font-bold text-xl">Filters</span>
    <div class="flex flex-col mt-7">
      <span class="font-medium">Size</span>
      <div class="flex items-center mt-2 gap-2">
        <img v-for="size in sizes" :key="size.name" :src=size.url alt=""
             @click="toggleSize('SIZE', `${size.name}`)" :class="selectedSizeClass(size.class, size.isActive)">
      </div>
    </div>
    <div class="border-b border-gray-400 mt-3.5"></div>
    <div class="flex flex-col gap-2 mt-3.5">
      <div class="flex items-center font-medium">
        <span class="font-bold">Availability</span>
        <img :src=availability alt="" class="ml-auto">
      </div>
      <div class="flex flex-col gap-2">
        <div v-for="(isActive, stackName) in stackProducts" class="flex gap-3">
          <img @click="toggleFilter('STATUS', stackName)" :src="isActive ? checked : square" alt=""
               :class="selectedFilterClass(isActive)">
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
          <img @click="toggleFilter('GENDER', genderName)" :src="isActive ? checked : square" alt=""
               :class="selectedFilterClass(isActive)">
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
          <img @click="toggleFilter('COLOR', colorName)" :src="isActive ? checked : square" alt=""
               :class="selectedFilterClass(isActive)">
          <div class="flex gap-1">
            <span>{{ colorName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-gray-400 mt-3.5"></div>
  </aside>
</template>

<script setup lang="ts">
const { allProducts, sizes } = productStore();
const { selectedSizeClass, selectedFilterClass } = productsClasses();
const { toggleFilter, toggleSize, stackProducts, genders, colors } = filterProduct();

import { filterProduct } from "@/features/use-navigation/model/filter-product.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { productsClasses } from "@/shared/constants/product/products.classes.ts";

import square from '@/assets/icons/squares/square.png'
import checked from '@/assets/icons/squares/check-square.png'
import availability from '@/assets/icons/arrows/arrow-up.png'
</script>

<style scoped>

</style>