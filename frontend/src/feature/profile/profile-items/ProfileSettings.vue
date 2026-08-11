<script setup lang="ts">
import { profile } from "@/shared/composables/profile.ts";
import { usersStore } from "@/shared/composables/stores/users.store";
import { useProfileModals } from "@/shared/composables/modals/profile.modals";
import { useProductsModals } from "@/shared/composables/modals/products.modals";

import ProfileMenu from "./ProfileMenu.vue";
import arrow_down from '@/app/assets/icons/arrows/arrow-down.png';
import sun from '@/app/assets/icons/mode/sun.svg';
import moon from '@/app/assets/icons/mode/moon.svg';

const { user } = usersStore();
const { userAvatar } = profile();
const { toggleCreateProductModal } = useProductsModals();
const {
  toggleAvatar, toggleOrderHistory, toggleCurrentOrder,
  toggleConfidentialityData, toggleAddressesAndCards
} = useProfileModals()
</script>

<template>
  <div class="flex flex-col bg-white rounded-xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img @click=toggleAvatar :src=userAvatar alt="" class="rounded-full w-25 transition duration-400 hover:scale-108">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Role:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user?.role }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Name:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user?.name }} {{ user?.surName }}</span>
           </div>
        </div>
      </div>
      <div class="flex gap-2 ml-auto">
        <ProfileMenu />
        <button class="relative flex items-center justify-center w-10 h-9 rounded-xl border transition-all duration-300
         bg-white border-neutral-200 hover:scale-105 active:scale-95 dark:bg-neutral-900 dark:border-neutral-800
         dark:hover:bg-neutral-800 dark:hover:border-neutral-700" aria-label="Toggle theme">
          <img :src="sun" alt="Light mode" class="w-5 h-5 transition-transform duration-300 dark:hidden rotate-0 hover:rotate-45" />
          <img :src="moon" alt="Dark mode" class="w-5 h-5 transition-transform duration-300 hidden dark:block -rotate-12 hover:rotate-0" />
        </button>
      </div>
    </div>
    <div class="flex flex-col border-t border-gray-300 font-medium">
      <div @click="toggleOrderHistory" class="border-b border-gray-300 py-6 px-6">
        <div class="flex items-center justify-between transition duration-400 hover:scale-105 cursor-pointer">
          <span>ALL ORDERS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <router-link :to="{ name: 'my/products' }">
        <div v-if="user?.role === 'Seller'" class="border-b border-gray-300 py-6 px-6">
          <div class="flex items-center justify-between transition duration-400 hover:scale-105 cursor-pointer">
            <span>MY PRODUCTS</span>
            <img :src="arrow_down" alt="">
          </div>
        </div>
      </router-link>
      <div @click="toggleCurrentOrder" class="border-b border-gray-300 py-6 px-6 cursor-pointer">
        <div class="flex items-center justify-between transition duration-400 hover:scale-105 cursor-pointer">
          <span>ACTIVE ORDERS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <div @click="toggleConfidentialityData" class="border-b border-gray-300 py-6 px-6 cursor-pointer">
        <div class="flex items-center justify-between transition duration-400 hover:scale-105 cursor-pointer">
          <span>CONFIDENTIALITY DATA</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <div v-if="user?.role === 'Seller'" @click="toggleCreateProductModal" class="border-b border-gray-300 py-6 px-6 cursor-pointer">
        <div class="flex items-center justify-between transition duration-400 hover:scale-105 cursor-pointer">
          <span>CREATE PRODUCT COVER</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <div @click="toggleAddressesAndCards" class="py-6 px-6 cursor-pointer">
        <div class="flex items-center justify-between transition duration-400 hover:scale-105 cursor-pointer">
          <span>SAVED ADDRESSES AND CARDS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>