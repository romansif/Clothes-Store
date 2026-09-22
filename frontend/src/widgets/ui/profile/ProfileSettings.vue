<template>
  <div class="flex flex-col bg-white rounded-xl shadow-2xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img v-if="userData"
             @click="toggleAvatar"
             :src="userAvatar(userData.avatarUrl)" alt=""
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
      <template v-if="user.role === 'Buyer'">
        <ProfileTab @click="toggleOrderHistory"
                    name="ALL ORDERS" />
        <ProfileTab @click="toggleCurrentOrder"
                    name="ACTIVE ORDERS" />
      </template>
      <template v-else>
        <router-link :to="{ name: 'my/products' }">
          <ProfileTab name="ALL MY PRODUCTS"/>
        </router-link>
        <ProfileTab @click="toggleConfidentialityData"
                    name="CONFIDENTIAL DATA" />
        <router-link :to="{ name: 'create/product' }" >
          <ProfileTab name="CREATE PRODUCT COVER"/>
        </router-link>
      </template>
      <ProfileTab v-if="user.role === 'Buyer'"
                  @click="toggleSavedPaymentCard"
                  name="SAVED CARDS" />
      <ProfileTab v-if="user.role === 'Buyer'"
                  @click="toggleSavedAddresses"
                  name="SAVED ADDRESSES" />
    </div>
  </div>
  <Transition name="notify">
    <ChangeAvatarModal v-if="avatarModal" />
  </Transition>
  <Transition name="notify">
    <AllOrderModal v-if="orderHistory" />
  </Transition>
  <Transition name="notify">
    <CurrentOrderModal v-if="currentOrder" />
  </Transition>
  <Transition name="notify">
    <SavedAddressModal v-if="savedAddresses" />
  </Transition>
  <Transition name="notify">
    <SavedPaymentModal v-if="savedPaymentCard" />
  </Transition>
  <Transition name="notify">
    <UserDataModal v-if="confidentialityData" />
  </Transition>
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
import type {User} from "@/entities/profile/model/user.types.ts";
import ChangeAvatarModal from "@/features/use-profile-form/ui/ChangeAvatarModal.vue";
import CurrentOrderModal from "@/features/use-order/ui/CurrentOrderModal.vue";
import AllOrderModal from "@/features/use-order/ui/AllOrderModal.vue";
import UserDataModal from "@/features/use-profile/ui/UserDataModal.vue";
import SavedAddressModal from "@/features/use-profile/ui/SavedAddressModal.vue";
import SavedPaymentModal from "@/features/use-profile/ui/SavedPaymentModal.vue";

const { userData } = userStore();
const { userAvatar } = useProfile();
const {
  toggleAvatar, toggleOrderHistory, toggleCurrentOrder,
  toggleConfidentialityData, toggleSavedAddresses,
  toggleSavedPaymentCard, avatarModal, orderHistory,
  currentOrder, savedAddresses, savedPaymentCard,
  confidentialityData
} = useProfileModals()
</script>

<style scoped>

</style>