<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

import cartImg from "@/app/assets/icons/nav/cart.png";
import liked from "@/app/assets/icons/nav/favorite.png";
import profile from "@/app/assets/icons/nav/profile.png";
import catalog from "@/app/assets/icons/nav/catalog.png";

const { unreadCount } = productsStore();

const route = useRoute();

const isProfile = computed(() => route.name !== "/profile/ProfilePage");
</script>

<template>
  <nav class="font-[Montserrat]">
    <div class="flex justify-between items-center md:justify-between">
      <div class="flex items-center gap-5 lg:gap-10">
        <img :src=catalog alt="" class=" w-[30px]">
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-5
            sm:hidden hidden font-semibold">
          <router-link :to="{name: 'home'}" class="text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-120">
            Home
          </router-link>
          <router-link :to="{name: 'products'}" class="text-[#696969] transition duration-400 hover:text-black hover:scale-120">
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
        <router-link :to="{name: 'favorite'}">
          <div class="xl:flex lg:flex md:flex sm:hidden hidden">
            <img :src=liked alt="" class=" transition duration-400 hover:scale-110">
          </div>
        </router-link>
        <router-link :to="{name: 'cart'}">
          <div class="xl:flex xl:items-center lg:flex md:flex  transition duration-400 hover:scale-110">
            <span class="px-7 py-3.5 bg-black rounded-3xl text-white items-center md:flex hidden">
                Cart
            </span>
            <div class="relative">
              <img :src=cartImg alt="" class="">
              <div v-if="unreadCount > 0" class='absolute bottom-7 left-8 bg-black px-3 py-0.5 rounded-full'>
                <span class="text-white text-lg">{{ unreadCount }}</span>
              </div>
            </div>
          </div>
        </router-link>
        <router-link v-if="isProfile" :to="{name: 'profile'}">
          <img :src=profile alt="" class="transition duration-400 hover:scale-120">
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>