<script setup lang="ts">
import photo_1 from '../../app/assets/photos/1.png'
import photo_2 from '../../app/assets/photos/2.png'
import photo_3 from '../../app/assets/photos/3.png'
import photo_4 from '../../app/assets/photos/4.png'
import photo_5 from '../../app/assets/photos/5.png'
import photo_6 from '../../app/assets/photos/6.png'
import photo_7 from '../../app/assets/photos/7.png'
import photo_8 from '../../app/assets/photos/8.png'
import photo_9 from '../../app/assets/photos/9.png'
import photo_10 from '../../app/assets/photos/10.png'
import back_arrow from "../../app/assets/icons/back-arrow.png";
import next_arrow from "../../app/assets/icons/next-arrow.png";
import arrow_down from "../../app/assets/icons/arrow-down.png";
</script>

<template>
  <main class="xl:px-12 lg:px-12 md:px-8 sm:px-6 px-6 xl:mt-25 lg:mt-95 md:mt-65 mt-45">
    <div class="flex flex-col">
      <div class="flex flex-col text-4xl">
        <span>NEW</span>
        <span>THIS WEEK</span>
      </div>
      <div class="flex flex-col">
        <span class="text-gray-500 ml-auto mb-3">See All</span>
        <ul class="flex gap-10 xl:gap-20 overflow-x-auto whitespace-nowrap no-scrollbar">
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src="photo_1" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src="photo_2" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src="photo_3" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src="photo_4" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex justify-center mt-5 gap-10">
        <div class="flex gap-3">
          <router-link :to="{name: 'login'}">
            <img :src=back_arrow alt="">
          </router-link>
          <router-link :to="{name: 'login'}">
            <img :src=next_arrow alt="">
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex flex-col xl:mt-25 lg:mt-95 md:mt-65 mt-45">
      <div class="flex flex-col text-4xl mb-8">
        <span>XIV</span>
        <span>COLLECTIONS</span>
        <span>25-26</span>
      </div>
      <div class="flex border-b-1 border-gray-300 gap-5 py-3">
        <router-link :to="{name: 'login'}">
          <span>(All)</span>
        </router-link>
        <router-link :to="{name: 'login'}">
          <span class="text-gray-500">Men</span>
        </router-link>
        <router-link :to="{name: 'login'}">
          <span class="text-gray-500">Women</span>
        </router-link>
        <router-link :to="{name: 'login'}">
          <span class="text-gray-500">Kid</span>
        </router-link>
      </div>
      <div class="flex flex-col mt-10">
        <ul class="flex gap-10 xl:gap-20 overflow-x-auto whitespace-nowrap no-scrollbar">
          <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src="photo_5" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
            <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src="photo_6" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
            <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'login'}">
              <img :src="photo_7" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
            <span class="whitespace-normal mt-2 text-gray-500">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex justify-center items-center mt-5 gap-10">
        <div class="flex flex-col items-center gap-2 text-lg">
          <router-link :to="{name: 'login'}">
            <span>More</span>
          </router-link>
          <router-link :to="{name: 'login'}">
            <img :src=arrow_down alt="" class="w-[20px]">
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex flex-col xl:mt-25 lg:mt-95 md:mt-65 mt-45">
      <div class="flex justify-center">
        <div class="flex flex-col items-center">
          <h1 class="font-bold text-4xl w-[300px] text-center md:w-full">Our Approach to fashion design</h1>
          <p class="text-gray-500 text-center w-[300px] mt-13 md:w-[540px]">
            at elegant vogue , we blend creativity with craftsmanship to create
            fashion that transcends trends and stands the test of time each design
            is meticulously crafted, ensuring the highest quelity exqulsite finish
          </p>
        </div>
      </div>
      <div class="flex justify-center mt-20 lg:mt-20 lg:flex">
        <ul class="flex flex-col lg:flex lg:flex-row gap-10 xl:gap-20 overflow-x-auto whitespace-nowrap no-scrollbar">
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] md:w-[300px] w-[200px]">
            <img :src="photo_8" alt="">
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] md:w-[300px] w-[200px] mt-0 lg:mt-20">
            <img :src="photo_9" alt="">
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] md:w-[300px] w-[200px]">
            <img :src="photo_10" alt="">
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>