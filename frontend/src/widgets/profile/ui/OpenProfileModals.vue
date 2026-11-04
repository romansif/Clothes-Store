<template>
  <template v-if="user.role === 'Buyer'">
    <ProfileTab :name="t('profile.menu.allOrders')" @click="toggleOrderHistory" />
    <ProfileTab :name="t('profile.menu.activeOrders')" @click="toggleCurrentOrder" />
    <ProfileTab :name="t('profile.menu.savedCards')" @click="toggleSavedPaymentCard" />
    <ProfileTab :name="t('profile.menu.savedAddresses')" @click="toggleSavedAddresses" />
  </template>
  <template v-else>
    <router-link :to="{ name: 'my/products' }">
      <ProfileTab :name="t('profile.menu.allMyProducts')" />
    </router-link>
    <router-link :to="{ name: 'create/product' }">
      <ProfileTab :name="t('profile.menu.createProductCover')" />
    </router-link>
  </template>
  <ProfileTab :name="t('profile.menu.confidentialData')" @click="toggleConfidentialityData" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { ProfileTab } from "@/shared/ui/profile-tab";
import type { User } from "@/entities/profile";

defineProps<{
  user: User;
}>();

const { t } = useI18n();
const { toggleOrderHistory, toggleCurrentOrder, toggleConfidentialityData, toggleSavedAddresses, toggleSavedPaymentCard } = useProfileModals();
</script>
