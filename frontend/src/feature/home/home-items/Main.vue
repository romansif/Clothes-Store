<script setup lang="ts">
import photo_1 from '@/app/assets/photos/home/1.png';
import photo_2 from '@/app/assets/photos/home/2.png';
import photo_3 from '@/app/assets/photos/home/3.png';
import photo_4 from '@/app/assets/photos/home/4.png';
import photo_5 from '@/app/assets/photos/home/5.png';
import photo_6 from '@/app/assets/photos/home/6.png';
import photo_7 from '@/app/assets/photos/home/7.png';
import photo_8 from '@/app/assets/photos/home/8.png';
import photo_9 from '@/app/assets/photos/home/9.png';
import photo_10 from '@/app/assets/photos/home/10.png';
import back_arrow from "@/app/assets/icons/arrows/past-arrow.png";
import next_arrow from "@/app/assets/icons/arrows/next-arrow.png";
import arrow_down from "@/app/assets/icons/arrows/arrow-down.png";
</script>

<template>
  <main class="font-[Montserrat] xl:mt-25 lg:mt-95 md:mt-65 mt-45">
    <div class="flex flex-col">
      <div class="font-extrabold flex flex-col text-5xl">
        <span>NEW</span>
        <span>THIS WEEK</span>
      </div>
      <div class="flex flex-col">
        <span class="text-[#A3A3A3] ml-auto mb-3">See All</span>
        <ul class="flex gap-10 xl:gap-20">
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src="photo_1" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-[#A3A3A3]">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src="photo_2" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-[#A3A3A3]">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src="photo_3" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-[#A3A3A3]">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src="photo_4" alt="">
            </router-link>
            <span class="whitespace-normal mt-2 text-[#A3A3A3]">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex justify-center mt-5 gap-10">
        <div class="flex gap-3">
          <img :src=back_arrow alt="" class="transtion duration-400 hover:scale-108 cursor-pointer">
          <img :src=next_arrow alt="" class="transtion duration-400 hover:scale-108 cursor-pointer">
        </div>
      </div>
    </div>
    <div class="flex flex-col xl:mt-25 lg:mt-95 md:mt-65 mt-45">
      <div class="font-extrabold flex flex-col text-5xl mb-8">
        <span>XIV</span>
        <span>COLLECTIONS</span>
        <span>25-26</span>
      </div>
      <div class="flex border-b-1 border-gray-300 gap-5 py-3 text-lg">
        <span class="transition duration-400 hover:text-black hover:scale-115">
          (
            <span class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer">All</span>
          )
        </span>
        <span class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer">Men</span>
        <span class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer">Women</span>
        <span class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer">KId</span>
      </div>
      <div class="flex flex-col mt-10">
        <ul class="flex gap-10 xl:gap-20 overflow-x-auto whitespace-nowrap no-scrollbar">
          <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src="photo_5" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
            <span class="whitespace-normal mt-2 text-[#A3A3A3]">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src="photo_6" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
            <span class="whitespace-normal mt-2 text-[#A3A3A3]">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src="photo_7" alt="" class="w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
            <span class="whitespace-normal mt-2 text-[#A3A3A3]">Cotton T Shirt</span>
            <div class="flex items-center justify-between font-medium text-base">
              <span class="whitespace-normal">Full Sleeve Zipper</span>
              <span>$ 199</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex justify-center items-center mt-5 gap-10">
        <div class="flex flex-col items-center gap-2 text-lg">
          <span>More</span>
          <img :src=arrow_down alt="" class="w-[20px] transition duration-400 hover:scale-120 cursor-pointer">
        </div>
      </div>
    </div>
    <div class="flex flex-col xl:mt-25 lg:mt-95 md:mt-65 mt-45">
      <div class="flex justify-center">
        <div class="flex flex-col items-center">
          <h1 class="font-normal text-5xl w-[300px] text-center md:w-full">Our Approach to fashion design</h1>
          <p class="font-light text-[#A3A3A3] text-center w-[300px] mt-13 md:w-[540px]">
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