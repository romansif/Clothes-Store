<template>
  <nav class="font-raleway">
    <div class="flex justify-between items-center md:justify-between">
      <div class="flex items-center gap-5 lg:gap-10">
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:flex md:gap-5
            sm:hidden hidden font-light">
          <router-link :to="{name: 'home'}"
                       :class="[routeClass, isHome ? selectRouteClass : '']">
            Home
          </router-link>
          <router-link :to="{name: 'shop/seasons-catalog'}"
                       :class="[routeClass, isSeasonCollections ? selectRouteClass : '']">
            Seasonal
          </router-link>
          <router-link :to="{name: 'shop'}"
                       :class="[routeClass, isProducts ? selectRouteClass : '']">
            Shop
          </router-link>
          <router-link :to="{name: 'shop/new-collections'}"
                       :class="[routeClass, isNewCollections ? selectRouteClass : '']">
            New
          </router-link>
        </div>
        <router-link v-if="!isProfile" :to="{name: 'shop'}">
          <div class="flex md:hidden">
            <img :src=back alt=""
                 class="rotate-180 transition duration-400 hover:scale-110 w-18">
          </div>
        </router-link>
      </div>
      <div class="xl:flex xl:gap-10
          lg:flex lg:gap-10
          md:flex md:gap-5
          sm:flex sm:gap-3
          flex gap-3">
        <router-link :to="{name: 'favorite'}">
          <div class="xl:flex lg:flex md:flex sm:hidden hidden">
            <img :src=liked alt=""
                 class="w-12.5 transition duration-400 hover:scale-110 rounded-full">
          </div>
        </router-link>
        <router-link :to="{name: 'cart'}">
          <div class="xl:flex xl:items-center lg:flex md:flex transition duration-400 hover:scale-110 gap-1">
            <span class="px-7 py-3.5 bg-black rounded-3xl text-white items-center md:flex hidden">
                Cart
            </span>
            <div class="relative">
              <img :src=cart alt=""
                   class="w-12.5 rounded-full">
              <div v-if="unreadCount > 0 && isCart"
                   class="absolute bottom-7 left-8 bg-black px-3 py-0.5 rounded-full">
                <span class="text-white text-lg font-dm-sans">{{ unreadCount }}</span>
              </div>
            </div>
          </div>
        </router-link>
        <router-link v-if="isProfile" :to="{name: 'profile'}">
          <img :src=profile alt=""
               class="bg-white transition duration-400 hover:scale-110 w-13.5 rounded-full">
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMainNavBar } from "@/widgets/navigation/lib/use-main-nav-bar";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { routeClass, selectRouteClass } from "@/widgets/navigation/model/route.variants";

import cart from "@/assets/icons/nav/cart.png";
import liked from "@/assets/icons/nav/favorite.jpeg";
import profile from "@/assets/icons/nav/profile.png";
import back from "@/assets/icons/arrows/right-long-arrow.png";

const route = useRoute();

const { unreadCount } = cartStore();
const { isHome, isCart, isProducts, isNewCollections, isSeasonCollections, isProfile} = useMainNavBar(route);
</script>
