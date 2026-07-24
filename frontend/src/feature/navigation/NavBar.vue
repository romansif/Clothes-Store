<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { productsStore } from "../../shared/composables/stores/products.store.ts";

import liked from "../../app/assets/icons/nav/favorite.png";
import cartImg from "../../app/assets/icons/nav/cart.png";
import profile from "../../app/assets/icons/nav/profile.png";
import catalog from "../../app/assets/icons/nav/catalog.png";

const { unreadCount } = productsStore();

const route = useRoute();

const isProducts = computed(() => route.name === "/products/ProductsPage");
const isProfile = computed(() => route.name !== "/profile/ProfilePage");
</script>

<template>
  <nav class="font-[Montserrat]">
    <div class="flex justify-between items-center md:justify-between">
      <div class="flex items-center gap-5 lg:gap-10">
        <router-link :to="{name: '/home/HomePage'}">
          <img :src=catalog alt="" class=" w-[30px]">
        </router-link>
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-5
            sm:hidden hidden">
          <span class="text-[#A3A3A3]">
            Collections
          </span>
          <router-link :to="{name: '/products/ProductsPage'}">
            <span :class="isProducts ? 'font-semibold' : 'text-[#A3A3A3]'">Products</span>
          </router-link>
          <span class="text-[#A3A3A3]">New</span>
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
        <router-link v-if="isProfile" :to="{name: '/profile/ProfilePage'}">
          <img :src=profile alt="" class="">
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>