<script setup lang="ts">
import xs from '../../../../app/assets/icons/size/xs.svg'
import s from '../../../../app/assets/icons/size/s.svg'
import m from '../../../../app/assets/icons/size/m.svg'
import l from '../../../../app/assets/icons/size/l.svg'
import xl from '../../../../app/assets/icons/size/xl.svg'
import xxl from '../../../../app/assets/icons/size/xxl.svg'
import availability from '../../../../app/assets/icons/arrows/arrow-up.png'
import square from '../../../../app/assets/icons/square.png'
import right_arrow from '../../../../app/assets/icons/arrows/right-arrow.png'
</script>

<template>
  <div class="font-[Montserrat] hidden mt-32.5 xl:flex xl:flex-col">
    <span class="font-bold text-xl">Filters</span>
    <div class="flex flex-col mt-5.5">
      <span class="font-medium">Size</span>
      <div class="flex items-center mt-2 gap-2">
        <img :src="xs" alt="" class="w-[40px] border-3 border-gray-300">
        <img :src="s" alt="" class="w-[40px] border-3 border-gray-300">
        <img :src="m" alt="" class="w-[40px] border-3 border-gray-300">
        <img :src="l" alt="" class="w-[40px] border-3 border-gray-300">
        <img :src="xl" alt="" class="w-[40px] border-3 border-gray-300">
        <img :src="xxl" alt="" class="w-[40px] border-3 border-gray-300">
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
      <div class="border-b-1 border-gray-400 mt-3.5"></div>
      <div class="flex items-center gap-2 mt-3.5">
       <span>Category</span>
        <img :src="right_arrow" alt="" class="ml-auto">
      </div>
      <div class="border-b-1 border-gray-400 mt-3.5"></div>
      <div class="flex items-center gap-2 mt-3.5">
        <span>Colors</span>
        <img :src="right_arrow" alt="" class="ml-auto">
      </div>
      <div class="border-b-1 border-gray-400 mt-3.5"></div>
      <div class="flex items-center gap-2 mt-3.5">
        <span>Price Range</span>
        <img :src="right_arrow" alt="" class="ml-auto">
      </div>
      <div class="border-b-1 border-gray-400 mt-3.5"></div>
      <div class="flex items-center gap-2 mt-3.5">
        <span>Collections</span>
        <img :src="right_arrow" alt="" class="ml-auto">
      </div>
      <div class="border-b-1 border-gray-400 mt-3.5"></div>
      <div class="flex items-center gap-2 mt-3.5">
        <span>Tags</span>
        <img :src="right_arrow" alt="" class="ml-auto">
      </div>
      <div class="border-b-1 border-gray-400 mt-3.5"></div>
      <div class="flex items-center gap-2 mt-3.5">
        <span>Ratings</span>
        <img :src="right_arrow" alt="" class="ml-auto">
      </div>
      <div class="border-b-1 border-gray-400 mt-3.5"></div>
    </div>
  </div>
</template>

<style scoped>

</style>