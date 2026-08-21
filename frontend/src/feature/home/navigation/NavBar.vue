<template>
  <nav class="font-[Montserrat]">
    <div class="flex justify-between items-center md:justify-between">
      <div class="flex items-center gap-5 lg:gap-10">
        <img :src=catalog alt="" class="w-7.5">
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-5
            sm:hidden hidden font-semibold">
          <span :class="['text-[#696969] cursor-pointer transition duration-400 hover:text-black hover:scale-120',
                isHome ? 'text-black scale-120' : '']">
            Home
          </span>
          <router-link :to="{name: 'products'}" class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-120">
            Products
          </router-link>
          <span class="text-[#A3A3A3] cursor-pointer transition duration-400 hover:text-black hover:scale-120">New</span>
        </div>
      </div>
      <div class="xl:flex xl:gap-10
          lg:flex lg:gap-10
          md:flex md:gap-5
          sm:flex sm:gap-3
          flex gap-3">
        <router-link :to="{name: 'favorite'}">
          <div class="xl:flex lg:flex md:flex sm:hidden hidden">
            <img :src=liked alt="" class="">
          </div>
        </router-link>
        <router-link :to="{name: 'cart'}">
          <div class="xl:flex xl:items-center lg:flex md:flex gap-1">
            <span class="px-7 py-3.5 bg-black rounded-4xl text-white items-center md:flex hidden">
              Cart
            </span>
            <img :src=cart alt="" class="">
          </div>
        </router-link>
        <router-link :to="{name: 'profile'}">
          <img :src=profile alt="" class="">
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed }  from "vue";
import { useRoute } from "vue-router";

import cart from "@/assets/icons/nav/cart.png";
import liked from "@/assets/icons/nav/favorite.png";
import profile from "@/assets/icons/nav/profile.png";
import catalog from "@/assets/icons/nav/catalog.png";

const route = useRoute();

const isHome = computed(() => route.name !== "");
</script>

<style scoped>

</style>