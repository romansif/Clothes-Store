<template>
  <div class="flex flex-col bg-white rounded-xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img @click=toggleAvatar :src=userAvatar alt="" class="rounded-full w-25 transition duration-400 hover:scale-108">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Role:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">
              {{ user?.role }}
            </span>
          </div>
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Name:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">
              {{ user?.name }} {{ user?.surName }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-2 ml-auto">
        <ProfileMenu />
      </div>
    </div>
    <div class="flex flex-col border-t border-gray-300 font-medium">
      <div @click="toggleOrderHistory" :class="profileTabsClass()">
        <div :class="profileTabsSpanClass()">
          <span>ALL ORDERS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <div @click="toggleCurrentOrder" :class="profileTabsClass()">
        <div :class="profileTabsSpanClass()">
          <span>ACTIVE ORDERS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <router-link :to="{ name: 'my/products' }">
        <div v-if="user?.role === 'Seller'" :class="profileTabsClass()">
          <div :class="profileTabsSpanClass()">
            <span>ALL MY PRODUCTS</span>
            <img :src="arrow_down" alt="">
          </div>
        </div>
      </router-link>
      <div @click="toggleConfidentialityData" :class="profileTabsClass()">
        <div :class="profileTabsSpanClass()">
          <span>CONFIDENTIALITY DATA</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
      <router-link :to="{ name: 'create/product' }" v-if="user?.role === 'Seller'" :class="profileTabsClass()">
        <div :class="profileTabsSpanClass()">
          <span>CREATE PRODUCT COVER</span>
          <img :src="arrow_down" alt="">
        </div>
      </router-link>
      <div @click="toggleAddressesAndCards" :class="profileTabsClass()">
        <div :class="profileTabsSpanClass()">
          <span>SAVED ADDRESSES AND CARDS</span>
          <img :src="arrow_down" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {profileClasses} from "@/shared/constants/users/profile.classes.ts";

const { user } = usersStore();
const { userAvatar } = useProfile();
const { profileTabsClass, profileTabsSpanClass } = profileClasses();
const {
  toggleAvatar, toggleOrderHistory, toggleCurrentOrder,
  toggleConfidentialityData, toggleAddressesAndCards
} = useProfileModals()

import { useProfile } from "@/shared/lib/use-profile.ts";
import { usersStore } from "@/feature/profile/model/users.store.ts";
import { useProfileModals } from "@/feature/profile/lib/profile.modals.ts";

import ProfileMenu from "./ProfileMenu.vue";
import arrow_down from '@/assets/icons/arrows/arrow-down.png';
</script>

<style scoped>

</style>