<script setup lang="ts">
import { onMounted } from "vue";
import { useProducts } from "@/feature/products/composables/use.products.ts";

import photo_1 from '@/app/assets/photos/8.png'
import photo_2 from '@/app/assets/photos/9.png'
import photo_3 from '@/app/assets/photos/10.png'

import WeekList from "@/feature/home/main/week-items/WeekList.vue";
import YearList from "@/feature/home/main/year-items/YearList.vue";
import FilterGender from "@/feature/home/main/FilterGender.vue";

const { getWeekProducts, getYearProducts } = useProducts();

onMounted(async () => {
  await getWeekProducts();
  await getYearProducts('ALL', 'ALL');
})
</script>

<template>
  <main class="font-[Montserrat] xl:mt-25 lg:mt-95 md:mt-65 mt-45">
    <div class="flex flex-col">
      <div class="font-extrabold flex flex-col text-5xl">
        <span>NEW</span>
        <span>THIS WEEK</span>
      </div>
      <div class="flex flex-col mt-5">
        <span class="text-[#A3A3A3] ml-auto mb-3 transition duration-400 hover:scale-120 hover:text-black cursor-pointer">See All</span>
        <WeekList />
      </div>
    </div>
    <div class="flex flex-col lg:mt-25 mt-10">
      <div class="font-extrabold flex flex-col text-5xl mb-8">
        <span>XIV</span>
        <span>COLLECTIONS</span>
        <span>25-26</span>
      </div>
      <FilterGender />
      <div class="flex flex-col mt-10">
        <YearList />
      </div>
    </div>
    <div class="flex flex-col mt-25">
      <div class="flex justify-center">
        <div class="flex flex-col items-center">
          <h1 class="font-normal text-5xl w-[300px] text-center md:w-full">Our Approach to fashion design</h1>
          <p class="font-light text-[#A3A3A3] text-center w-[300px] mt-13 md:w-[540px]">
            At elegant vogue , we blend creativity with craftsmanship to create
            fashion that transcends trends and stands the test of time each design
            is meticulously crafted, ensuring the highest quelity exqulsite finish
          </p>
        </div>
      </div>
      <div class="flex justify-center mt-20 lg:mt-20 lg:flex">
        <ul class="flex flex-col lg:flex lg:flex-row gap-10 xl:gap-20 overflow-x-auto whitespace-nowrap no-scrollbar">
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] md:w-[300px] w-[200px]">
            <img :src="photo_1" alt="">
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] md:w-[300px] w-[200px] mt-0 lg:mt-20">
            <img :src="photo_2" alt="">
          </li>
          <li class="flex flex-col flex-shrink-0 lg:w-[300px] md:w-[300px] w-[200px]">
            <img :src="photo_3" alt="">
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>