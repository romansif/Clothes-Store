<template>
  <div class="flex flex-col bg-white rounded-xl shadow-2xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img v-if="userData" @click="toggleAvatar" :src="userAvatar(userData.avatarUrl)" alt=""
             class="rounded-full w-25 transition duration-400 hover:scale-108">
        <div class="flex flex-col gap-4 font-semibold text-xl">
          <div class="flex gap-2 font-dm-sans">
            <span>Name:</span>
            <span>
              {{ user.name }}
            </span>
          </div>
          <div v-if="!user.surName" class="flex gap-2">
            <span class="font-medium text-sm opacity-50">
              Surname not provided
            </span>
          </div>
          <div v-else class="flex gap-2 font-dm-sans">
            <span>Surname:</span>
            <span>
              {{ user.surName }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-2 ml-auto">
        <ProfileMenu />
      </div>
    </div>
    <div class="flex flex-col border-t border-gray-300 font-medium">
      <ProfileTab @click="toggleOrderHistory" v-if="user.role === 'Buyer'"
                  name="ALL ORDERS" />
      <ProfileTab @click="toggleCurrentOrder" v-if="user.role === 'Buyer'"
                  name="ACTIVE ORDERS" />
      <router-link :to="{ name: 'my/products' }" v-if="user.role === 'Seller'">
        <ProfileTab name="ALL MY PRODUCTS"/>
      </router-link>
      <ProfileTab @click="toggleConfidentialityData" name="CONFIDENTIAL DATA" />
      <router-link :to="{ name: 'create/product' }" v-if="user.role === 'Seller'">
        <ProfileTab name="CREATE PRODUCT COVER"/>
      </router-link>
      <ProfileTab @click="toggleAddressesAndCards" v-if="user.role === 'Buyer'"
                  name="SAVED ADDRESSES AND CARDS" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";

defineProps<{
  user: User
}>();

import ProfileMenu from "./ProfileMenu.vue";
import ProfileTab from "@/shared/ui/profile/ProfileTab.vue";
import type {User} from "@/features/use-profile/model/user.types.ts";

const { userData } = userStore();
const { userAvatar } = useProfile();
const {
  toggleAvatar, toggleOrderHistory, toggleCurrentOrder,
  toggleConfidentialityData, toggleAddressesAndCards
} = useProfileModals()

</script>

<style scoped>

</style>