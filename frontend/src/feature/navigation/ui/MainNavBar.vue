<template>
  <nav class="font-[Montserrat]">
    <div class="flex justify-between items-center md:justify-between">
      <div class="flex items-center gap-5 lg:gap-10">
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-5
            sm:hidden hidden font-semibold">
          <router-link :to="{name: 'home'}" :class="selectedPageClass(isHome)">
            Home
          </router-link>
          <router-link :to="{name: 'products'}" :class="selectedPageClass(isProducts)">
            Products
          </router-link>
          <router-link :to="{name: 'products/new-collections'}" :class="selectedPageClass(isNewCollections)">
            New
          </router-link>
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
          <div class="xl:flex xl:items-center lg:flex md:flex  transition duration-400 hover:scale-110 gap-1">
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

<script setup lang="ts">
const { unreadCount } = cartStore();
const { selectedPageClass } = baseClasses();

import { computed } from "vue";
import { useRoute } from "vue-router";
import { baseClasses } from "@/shared/constants/base.classes.ts";
import { cartStore } from "@/feature/cart/model/cart.store.ts";

import cartImg from "@/assets/icons/nav/cart.png";
import liked from "@/assets/icons/nav/favorite.png";
import profile from "@/assets/icons/nav/profile.png";

const route = useRoute();

const isHome = computed(() => route.name === "");
const isProducts = computed(() => route.name === "products");
const isProfile = computed(() => route.name !== "profile");
const isNewCollections = computed(() => route.name === "products/new-collections");
</script>

<style scoped>

</style>