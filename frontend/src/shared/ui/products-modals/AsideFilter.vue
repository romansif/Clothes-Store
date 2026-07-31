<script setup lang="ts">
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";

import s from "@/app/assets/icons/size/s.svg";
import m from "@/app/assets/icons/size/m.svg";
import l from "@/app/assets/icons/size/l.svg";
import xl from "@/app/assets/icons/size/xl.svg";
import xs from "@/app/assets/icons/size/xs.svg";
import xxl from "@/app/assets/icons/size/xxl.svg";
import square from "@/app/assets/icons/square.png";
import availability from "@/app/assets/icons/arrows/arrow-up.png";
import left_arrow from "@/app/assets/icons/arrows/left-arrow.png";
import right_arrow from "@/app/assets/icons/arrows/right-arrow.png";

const { toggleFilterAside } = useProductsModals();
</script>

<template>
  <section class="fixed inset-0 z-50">
    <div class="font-[Montserrat] flex flex-col h-screen bg-white px-6 py-6 sm:w-[305px] md:w-[330px]">
      <div class="flex gap-5 items-center" @click=toggleFilterAside>
        <span class="font-bold text-xl">Filters</span>
        <img :src=left_arrow alt="">
      </div>
      <div class="flex flex-col mt-6 sm:mt-20">
        <span class="font-medium">Size</span>
        <div class="flex gap-4 sm:gap-1 mt-5.5 md:gap-2">
          <img :src="xs" alt="" class="w-[40px] border-3 border-gray-300">
          <img :src="s" alt="" class="w-[40px] border-3 border-gray-300">
          <img :src="m" alt="" class="w-[40px] border-3 border-gray-300">
          <img :src="l" alt="" class="w-[40px] border-3 border-gray-300">
          <img :src="xl" alt="" class="w-[40px] border-3 border-gray-300">
          <img :src="xxl" alt="" class="w-[40px] border-3 border-gray-300">
        </div>
      </div>
      <div class="border-b-1 border-gray-400 mt-3.5 sm:mt-5"></div>
      <div class="flex flex-col gap-2 mt-3.5">
        <div class="flex items-center font-medium">
          <span class="font-bold">Availability</span>
          <img :src=availability alt="" class="ml-auto">
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-3">
            <img :src=square alt="">
            <span>Availability</span>
            <span>(<span class="text-blue-700 font-medium">450</span>)</span>
          </div>
          <div class="flex gap-3">
            <img :src=square alt="">
            <span>Out Of Stack</span>
            <span>(<span class="text-blue-700 font-medium">18</span>)</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col font-bold">
        <div class="border-b-1 border-gray-400 mt-3.5 sm:mt-5"></div>
        <div class="flex items-center gap-2 mt-3.5 sm:mt-5">
          <span>Category</span>
          <img :src="right_arrow" alt="" class="ml-auto">
        </div>
        <div class="border-b-1 border-gray-400 mt-3.5 v"></div>
        <div class="flex items-center gap-2 mt-3.5 sm:mt-5">
          <span>Colors</span>
          <img :src="right_arrow" alt="" class="ml-auto">
        </div>
        <div class="border-b-1 border-gray-400 mt-3.5 sm:mt-5"></div>
        <div class="flex items-center gap-2 mt-3.5 sm:mt-5">
          <span>Price Range</span>
          <img :src="right_arrow" alt="" class="ml-auto">
        </div>
        <div class="border-b-1 border-gray-400 mt-3.5 sm:mt-5"></div>
        <div class="flex items-center gap-2 mt-3.5 sm:mt-5">
          <span>Collections</span>
          <img :src="right_arrow" alt="" class="ml-auto">
        </div>
        <div class="border-b-1 border-gray-400 mt-3.5 sm:mt-5"></div>
        <div class="flex items-center gap-2 mt-3.5 sm:mt-5">
          <span>Tags</span>
          <img :src="right_arrow" alt="" class="ml-auto">
        </div>
        <div class="border-b-1 border-gray-400 mt-3.5 sm:mt-5"></div>
        <div class="flex items-center gap-2 mt-3.5 sm:mt-5">
          <span>Ratings</span>
          <img :src="right_arrow" alt="" class="ml-auto">
        </div>
      </div>
      <div class="font-medium mt-5 grid grid-cols-2 gap-x-5 gap-y-2 sm:hidden xl:mt-22">
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          NEW
        </button>
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          SHIRTS
        </button>
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          POLO SHIRTS
        </button>
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          SHORTS
        </button>
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          BEST SELLERS
        </button>
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          T-SHIRTS
        </button>
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          JEANS
        </button>
        <button class="border-1 sm:px-2 sm:py-1 md:px-3 border-gray-500">
          JACKETS
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>