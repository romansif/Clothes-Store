<template>
  <template v-if="user.role === 'Buyer'">
    <ProfileTab name="ALL ORDERS"
                @click="toggleOrderHistory" />
    <ProfileTab name="ACTIVE ORDERS"
                @click="toggleCurrentOrder" />
    <ProfileTab name="SAVED CARDS"
                @click="toggleSavedPaymentCard" />
    <ProfileTab name="SAVED ADDRESSES"
                @click="toggleSavedAddresses" />
  </template>
  <template v-else>
    <router-link :to="{ name: 'my/products' }">
      <ProfileTab name="ALL MY PRODUCTS"/>
    </router-link>
    <router-link :to="{ name: 'create/product' }" >
      <ProfileTab name="CREATE PRODUCT COVER"/>
    </router-link>
  </template>
  <ProfileTab name="CONFIDENTIAL DATA"
              @click="toggleConfidentialityData" />
</template>

<script setup lang="ts">
import { useProfileModals } from "@/features/use-profile/lib/profile-modal";
import { ProfileTab } from "@/shared/ui/profile-tab";
import type { User } from "@/entities/profile";

defineProps<{
  user: User
}>();

const {
  toggleOrderHistory, toggleCurrentOrder,
  toggleConfidentialityData, toggleSavedAddresses,
  toggleSavedPaymentCard,
} = useProfileModals();
</script>
