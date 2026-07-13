<script setup lang="ts">
import shirt_2 from "../../../../../app/assets/photos/home/shirt-2.png";
import del from "../../../../../app/assets/icons/delete.svg";
import l from "../../../../../app/assets/icons/size/l.svg";
import update from "../../../../../app/assets/icons/update.svg";
</script>

<template>
  <li class="flex gap-5">
    <div class="flex flex-col">
      <img :src="shirt_2" alt="" class="w-full h-[314px] sm:h-[314px] xl:h-[400px]">
      <span class="whitespace-normal mt-2 text-gray-500 text-sm sm:text-lg">Cotton T Shirt</span>
      <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
        <span class="whitespace-normal">Full Sleeve Zipper</span>
        <span>$ 199</span>
      </div>
    </div>
    <div class="flex flex-col gap-15">
      <img :src="del" alt="">
      <div class="flex flex-col gap-4">
        <img :src="l" alt="">
        <div class="bg-black p-3"></div>
        <div class="flex flex-col border">
          <button class="border-b">+</button>
          <span class="text-sm border-b text-center">1</span>
          <button class="text-sm">-</button>
        </div>
        <img :src="update" alt="">
      </div>
    </div>
  </li>
  <li class="flex gap-5">
    <div class="flex flex-col">
      <img :src="shirt_2" alt="" class="w-full h-[314px] sm:h-[314px] xl:h-[400px]">
      <span class="whitespace-normal mt-2 text-gray-500 text-sm sm:text-lg">Cotton T Shirt</span>
      <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
        <span class="whitespace-normal">Full Sleeve Zipper</span>
        <span>$ 199</span>
      </div>
    </div>
    <div class="flex flex-col gap-15">
      <img :src="del" alt="">
      <div class="flex flex-col gap-4">
        <img :src="l" alt="">
        <div class="bg-black p-3"></div>
        <div class="flex flex-col border">
          <button class="border-b">+</button>
          <span class="text-sm border-b text-center">1</span>
          <button class="text-sm">-</button>
        </div>
        <img :src="update" alt="">
      </div>
    </div>
  </li>
  <li class="flex gap-5">
    <div class="flex flex-col">
      <img :src="shirt_2" alt="" class="w-full h-[314px] sm:h-[314px] xl:h-[400px]">
      <span class="whitespace-normal mt-2 text-gray-500 text-sm sm:text-lg">Cotton T Shirt</span>
      <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
        <span class="whitespace-normal">Full Sleeve Zipper</span>
        <span>$ 199</span>
      </div>
    </div>
    <div class="flex flex-col gap-15">
      <img :src="del" alt="">
      <div class="flex flex-col gap-4">

        <div class="bg-black p-3"></div>
        <div class="flex flex-col border">
          <button class="border-b">+</button>
          <span class="text-sm border-b text-center">1</span>
          <button class="text-sm">-</button>
        </div>
        <img :src="update" alt="">
      </div>
    </div>
  </li>
</template>

<style scoped>

</style>