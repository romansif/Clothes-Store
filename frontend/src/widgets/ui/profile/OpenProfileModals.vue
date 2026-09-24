<template>
  <template v-if="user.role === 'Buyer'">
    <ProfileTab name="ALL ORDERS"
                @click="toggleOrderHistory" />
    <ProfileTab name="ACTIVE ORDERS"
                @click="toggleCurrentOrder" />
  </template>
  <template v-else>
    <router-link :to="{ name: 'my/products' }">
      <ProfileTab name="ALL MY PRODUCTS"/>
    </router-link>
    <ProfileTab name="CONFIDENTIAL DATA"
                @click="toggleConfidentialityData" />
    <router-link :to="{ name: 'create/product' }" >
      <ProfileTab name="CREATE PRODUCT COVER"/>
    </router-link>
  </template>
  <ProfileTab v-if="user.role === 'Buyer'"
              name="SAVED CARDS"
              @click="toggleSavedPaymentCard" />
  <ProfileTab v-if="user.role === 'Buyer'"
              name="SAVED ADDRESSES"
              @click="toggleSavedAddresses" />
</template>

<script setup lang="ts">
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import type {User} from "@/entities/profile/model/user.types.ts";

defineProps<{
  user: User
}>();

import ProfileTab from "@/shared/ui/profile/ProfileTab.vue";

const {
  toggleOrderHistory, toggleCurrentOrder,
  toggleConfidentialityData, toggleSavedAddresses,
  toggleSavedPaymentCard,
} = useProfileModals();
</script>


<style scoped>

</style>