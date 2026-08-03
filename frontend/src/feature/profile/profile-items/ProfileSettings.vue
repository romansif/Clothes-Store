<script setup lang="ts">
import { useProfile } from "@/shared/composables/use.profile.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";

import ProfileMenu from "./ProfileMenu.vue";
import arrow_down from '@/app/assets/icons/arrows/arrow-down.png'

const { user } = usersStore();
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
        <img @click=toggleAvatar :src=useProfile.userAvatar.value alt="" class="rounded-full w-30 transition duration-400 hover:scale-108">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Role:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user.role }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Name:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user.surName }} {{ user.name }}</span>
           </div>
        </div>
      </div>
      <ProfileMenu />
    </div>
    <div class="flex flex-col border-t border-gray-300 font-medium">
      <div @click="toggleOrderHistory" class="border-b border-gray-300 py-6 px-6 transition duration-400 hover:scale-105 cursor-pointer">
        <div class="flex items-center justify-between">
          <span>ALL ORDERS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <router-link :to="{ name: 'my/products' }" class="transition duration-400 hover:scale-105">
        <div v-if="user.role === 'Seller'" class="border-b border-gray-300 py-6 px-6">
          <div class="flex items-center justify-between">
            <span>MY PRODUCTS</span>
            <img :src="arrow_down" alt="">
          </div>
        </div>
      </router-link>
      <div @click="toggleCurrentOrder" class="border-b border-gray-300 py-6 px-6 transition duration-400 hover:scale-105 cursor-pointer">
        <div class="flex items-center justify-between">
          <span>ACTIVE ORDERS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <div @click="toggleConfidentialityData" class="border-b border-gray-300 py-6 px-6 transition duration-400 hover:scale-105 cursor-pointer">
        <div class="flex items-center justify-between">
          <span>CONFIDENTIALITY DATA</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <div v-if="user.role === 'Seller'" @click="toggleCreateProductModal" class="border-b border-gray-300 py-6 px-6 transition duration-400 hover:scale-105 cursor-pointer">
        <div class="flex items-center justify-between">
          <span>CREATE PRODUCT COVER</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <div @click="toggleAddressesAndCards" class="py-6 px-6 transition duration-400 hover:scale-105 cursor-pointer">
        <div class="flex items-center justify-between">
          <span>SAVED ADDRESSES AND CARDS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>