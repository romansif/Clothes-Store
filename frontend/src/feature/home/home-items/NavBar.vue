<script setup lang="ts">
import liked from "../../app/assets/icons/liked.png";
import cart from "../../app/assets/icons/cart.png";
import profile from "../../app/assets/icons/profile.png";
import search from "../../app/assets/icons/search.png";
import catalog from "../../app/assets/icons/catalog.png";
</script>

<template>
  <nav class="xl:px-12 xl:pt-12 lg:px-12 lg:pt-12 md:px-8 md:pt-8 sm:px-6 sm:pt-6 px-6 pt-6">
    <div class="flex justify-between items-center md:justify-between">
      <div class="flex items-center gap-5 lg:gap-10">
        <router-link :to="{name: 'login'}">
          <img :src=catalog alt="" class=" w-[30px]">
        </router-link>
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-5
            sm:hidden hidden">
          <router-link :to="{name: 'login'}">
          <span class="font-medium ">
            Home
          </span>
          </router-link>
          <router-link :to="{name: 'login'}">
            <span class="">Collections</span>
          </router-link>
          <router-link :to="{name: 'login'}">
            <span class="">New</span>
          </router-link>
        </div>
      </div>
      <div class="xl:flex xl:gap-10
          lg:flex lg:gap-10
          md:flex md:gap-5
          sm:flex sm:gap-3
          flex gap-3">
        <div class="xl:flex lg:flex md:flex sm:hidden hidden">
          <router-link :to="{name: 'login'}">
            <img :src=liked alt="" class="">
          </router-link>
        </div>
        <div class="xl:flex xl:items-center lg:flex md:flex ">
          <router-link :to="{name: 'login'}">
            <span class="px-7 py-3.5 bg-black rounded-4xl text-white items-center md:flex hidden">
              Cart
            </span>
          </router-link>
          <router-link :to="{name: 'login'}">
            <img :src=cart alt="" class="">
          </router-link>
        </div>
        <router-link :to="{name: 'login'}">
          <img :src=profile alt="" class="">
        </router-link>
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