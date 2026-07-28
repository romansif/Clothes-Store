<script setup lang="ts">
import liked from "../../../app/assets/icons/nav/favorite.png";
import cart from "../../../app/assets/icons/nav/cart.png";
import profile from "../../../app/assets/icons/nav/profile.png";
import search from "../../../app/assets/icons/nav/search.png";
import catalog from "../../../app/assets/icons/nav/catalog.png";
</script>

<template>
  <nav class="font-[Montserrat]">
    <div class="flex justify-between items-center md:justify-between">
      <div class="flex items-center gap-5 lg:gap-10">
        <img :src=catalog alt="" class="w-[30px]">
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-5
            sm:hidden hidden font-semibold">
          <span class="text-[#696969] transition duration-400 hover:text-black hover:scale-120">
            Home
          </span>
          <router-link :to="{name: '/products/ProductsPage'}" class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-120">
            Products
          </router-link>
          <span class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-120">New</span>
        </div>
      </div>
      <div class="xl:flex xl:gap-10
          lg:flex lg:gap-10
          md:flex md:gap-5
          sm:flex sm:gap-3
          flex gap-3">
        <router-link :to="{name: '/profile/profile-products/FavoriteProductsPage'}">
          <div class="xl:flex lg:flex md:flex sm:hidden hidden">
            <img :src=liked alt="" class="">
          </div>
        </router-link>
        <router-link :to="{name: '/profile/profile-products/ProductsCartPage'}">
          <div class="xl:flex xl:items-center lg:flex md:flex ">
            <span class="px-7 py-3.5 bg-black rounded-4xl text-white items-center md:flex hidden">
              Cart
            </span>
            <img :src=cart alt="" class="">
          </div>
        </router-link>
        <router-link :to="{name: '/profile/ProfilePage'}">
          <img :src=profile alt="" class="">
        </router-link>
      </div>
    </div>
    <div class="flex flex-col py-12 gap-5">
      <div class="font-normal flex flex-col">
        <span>MEN</span>
        <span>WOMEN</span>
        <span>KIDS</span>
      </div>
      <div class="flex">
        <div class="relative">
          <input type="text" class="bg-[#D9D9D9]  h-[50px] w-[300px] sm:w-[400px] placeholder:px-45
              xl:border-none xl:outline-none px-10 sm:placeholder:px-70 transition duration-400 hover:bg-[#D9D9D9]/40
              focus:bg-[#D9D9D9]/40" placeholder="Search">
          <img :src=search alt="" class="absolute left-4 top-1/2 -translate-y-1/2">
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>