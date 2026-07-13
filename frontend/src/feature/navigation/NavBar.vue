<script setup lang="ts">
import catalog from "../../app/assets/icons/catalog.png";
import logo from "../../app/assets/icons/logo.png";
import liked from "../../app/assets/icons/liked.png";
import cart from "../../app/assets/icons/cart.png";
import profile from "../../app/assets/icons/profile.png";
import search from "../../app/assets/icons/search.png";
</script>

<template>
  <nav class="xl:px-12 xl:mt-12 lg:px-12 lg:mt-12 md:px-8 md:mt-8 sm:px-6 sm:mt-6 px-6 mt-6">
    <div class="flex items-center justify-between">
      <div class="flex gap-10">
        <img :src=catalog alt="" class="cursor-pointer">
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-3
            sm:hidden hidden">
          <span class="xl:font-bold lg:font-bold cursor-pointer">
            Home
          </span>
          <span class="cursor-pointer">Collections</span>
          <span class="cursor-pointer">New</span>
        </div>
      </div>
      <div>
        <img :src=logo alt="" class="w-[45px]" />
      </div>
      <div class="xl:flex xl:gap-10
          lg:flex lg:gap-10
          md:flex md:gap-5
          sm:flex sm:gap-3
          flex gap-3">
        <div class="xl:flex lg:flex md:flex sm:hidden hidden">
          <img :src=liked alt="" class="cursor-pointer">
        </div>
        <div class="xl:flex xl:items-center lg:flex md:flex sm:hidden hidden cursor-pointer">
            <span class="px-7 py-3.5 bg-black rounded-4xl text-white items-center">
              Cart
            </span>
          <img :src=cart alt="" class="">
        </div>
        <img :src=profile alt="" class="cursor-pointer">
      </div>
    </div>
    <div class="flex flex-col py-12 gap-5">
      <div class="flex flex-col">
        <span>MEN</span>
        <span>WOMEN</span>
        <span>KIDS</span>
      </div>
      <div class="flex">
        <div class="relative">
          <input type="text" class="bg-[#D9D9D9] h-[50px] w-[300px] sm:w-[400px] placeholder:px-45 xl:border-none xl:outline-none px-10 sm:placeholder:px-70" placeholder="Search">
          <img :src=search alt="" class="absolute left-4 top-1/2 -translate-y-1/2">
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>