<script setup lang="ts">
import photo_1 from "../../app/assets/photos/pants.png";
import photo_2 from "../../app/assets/photos/shirt.png";
import arrow from "../../app/assets/icons/go-to-shop.png";
import arrow_2 from "../../app/assets/icons/back-arrow.png";
import arrow_3 from "../../app/assets/icons/next-arrow.png";
</script>

<template>
  <header class="xl:px-12 lg:px-12 md:px-8 sm:px-6 px-6 w-full">
    <div class="xl:flex lg:flex h-[380px]">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col text-4xl">
          <span>NEW</span>
          <span>COLLECTION</span>
        </div>
        <div class="flex flex-col">
          <span>Summer</span>
          <span>2026</span>
        </div>
        <div class="xl:hidden lg:block mt-5">
          <ul class="flex gap-6 md:gap-10 overflow-x-auto whitespace-nowrap no-scrollbar lg:max-w-[1120px] w-full h-fit md:px-0">
            <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
              <router-link :to="{name: 'login'}">
                <img :src="photo_1" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]" />
              </router-link>
              <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
              <div class="flex items-center justify-between font-medium text-base">
                <span class="whitespace-normal">Full Sleeve Zipper</span>
                <span>$ 199</span>
              </div>
            </li>
            <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
              <img :src="photo_2" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]" />
              <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
              <div class="flex items-center justify-between font-medium text-base">
                <span class="whitespace-normal">Full Sleeve Zipper</span>
                <span>$ 199</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="xl:flex xl:mt-auto mt-5 gap-10">
          <div class="relative ">
            <router-link :to="{name: 'login'}">
              <button class="bg-[#D9D9D9] xl:w-[265px] w-[200px] py-2 text-start xl:pl-4 pl-3 ">Go To Shop</button>
              <img :src=arrow alt="" class="absolute xl:left-50 left-35 top-1/2 -translate-y-1/2">
            </router-link>
          </div>
          <div class="xl:flex gap-3 hidden">
            <router-link :to="{name: 'login'}">
              <img :src=arrow_2 alt="" class="">
            </router-link>
            <router-link :to="{name: 'login'}">
              <img :src=arrow_3 alt="" class="">
            </router-link>
          </div>
        </div>
      </div>
      <div class="xl:flex xl:ml-auto
            lg:hidden hidden">
        <ul class="xl:flex xl:gap-10 xl:ml-auto">
          <li class="flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src=photo_1 alt="" class=" w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
          </li>
          <li class="flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src=photo_2 alt="" class=" w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>