<template>
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
</template>

<script setup lang="ts">
import { useProfileModals } from "@/shared/lib/profile-modal.ts";
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