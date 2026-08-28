<template>
  <aside class="fixed inset-0 z-50">
    <div class="font-raleway flex flex-col h-screen bg-white px-6 py-6 sm:w-76.25 md:w-82.5">
      <div class="flex gap-5 items-center" @click="toggleFilterAside">
        <span class="font-bold text-xl cursor-pointer">Filters</span>
        <img :src=left_arrow alt="">
      </div>
      <div class="flex flex-col mt-6 sm:mt-7.5">
        <span class="font-medium">Size</span>
        <div class="flex gap-4 sm:gap-1 mt-3.5 md:gap-2">
          <img v-for="size in sizes" :key="size.name" :src=size.url alt=""
               @click="toggleSize('SIZE', `${size.name}`)"
               :class="[size.class, 'w-10 transition duration-400 hover:scale-120 cursor-pointer', size.isActive ? 'scale-120' : '']">
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
                 alt="" :class="['w-5.75 h-5.75 transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : '']">
            <div class="flex gap-1">
              <span>{{ stackName }}</span>
              <span>
              (<span class="text-blue-700 font-medium font-dm-sans">
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
                 alt="" :class="['w-5.75 h-5.75 transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : '']">
            <div class="flex gap-1">
              <span>{{ genderName }}</span>
              <span>
              (<span class="text-blue-700 font-medium font-dm-sans">
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
                 alt="" :class="['w-5.75 h-5.75 transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : '']">
            <div class="flex gap-1">
              <span>{{ colorName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-400 mt-3.5"></div>
      <div class="flex flex-col gap-2 mt-3.5">
        <div class="flex items-center font-medium">
          <span class="font-bold">Category</span>
          <img :src=availability alt="" class="ml-auto">
        </div>
        <div v-if="isHome" class="font-medium grid grid-cols-2 gap-y-2 gap-x-6">
          <button v-for="(isActive, categoryName) in category" @click="toggleFilter('ALL', categoryName)"
                  :class="selectedSidebarCategoryClass(isActive)">
            All
          </button>
          <button v-for="(isActive, categoryName) in categories" @click="toggleFilter('CATEGORY', categoryName)"
                  :class="selectedSidebarCategoryClass(isActive)">
            {{ categoryName }}
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { getAllProducts } = productApi();
const { allProducts, sizes } = productStore();
const { toggleFilterAside } = useProductsModals();
const { selectedSidebarCategoryClass } = productsClasses();
const { toggleFilter, toggleSize, stackProducts, genders, colors, category, categories } = filterProduct();

import { useRoute } from 'vue-router';
import { computed, onMounted } from "vue";
import { filterProduct } from "@/features/use-navigation/model/filter-product.ts";
import { productsClasses } from "@/shared/const/product/products.classes.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

import square from "@/assets/icons/squares/square.png";
import availability from "@/assets/icons/arrows/arrow-up.png";
import left_arrow from "@/assets/icons/arrows/left-arrow.png";
import checked from '@/assets/icons/squares/check-square.png'

const route = useRoute();

const isHome = computed(() => route.name === 'home');

onMounted(async() => {
  await getAllProducts();
})
</script>

<style scoped>

</style>