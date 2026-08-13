<script setup lang="ts">
import { onMounted } from "vue";
import { useProducts } from "@/feature/products/composables/use.products.ts";

import arrow from "@/app/assets/icons/arrows/right-shop.svg";
import photo_1 from "@/app/assets/photos/pants.png";
import photo_2 from "@/app/assets/photos/shirt.png";
import HeaderList from "@/feature/home/header/header-items/HeaderList.vue";

const { getAllProducts } = useProducts();

onMounted(async () => {
  await getAllProducts();
})
</script>

<template>
  <header class="font-[Montserrat] w-full mt-14">
    <div class="xl:flex lg:flex h-[380px]">
      <div class="flex flex-col gap-2">
        <div class="font-extrabold flex flex-col text-5xl">
          <span>NEW</span>
          <span>COLLECTION</span>
        </div>
        <div class="flex flex-col text-lg text-[#A3A3A3]">
          <span>Summer</span>
          <span>2026</span>
        </div>
        <div class="xl:hidden lg:block mt-5">
          <HeaderList />
        </div>
        <div class="relative transtion duration-400 hover:scale-108 mt-5 xl:mt-auto ">
          <router-link :to="{name: 'products'}">
              <span class="bg-black font-semibold text-white xl:w-[265px] px-40 py-3 text-start
                  xl:pl-4 pl-3 cursor-pointer">Go To Shop</span>
            <img :src=arrow alt="" class="absolute h-13 left-50 xl:left-50 top-1/2 -translate-y-1/2">
          </router-link>
        </div>
      </div>
      <div class="xl:flex xl:ml-auto lg:hidden hidden">
        <ul class="xl:flex xl:gap-10 xl:ml-auto">
          <li class="flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
              <img :src=photo_1 alt="" class=" w-full h-[200px] lg:h-[380px] md:h-[280px]">
            </router-link>
          </li>
          <li class="flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
            <router-link :to="{name: 'products/info'}">
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