<template>
  <template v-if="props.user.role === 'Buyer'">
    <router-link :to="{ path: `/orders/${props.user.id}` }">
      <ProfileTab :name="t('profile.menu.allOrders')" />
    </router-link>
    <router-link :to="{ path: `/active/orders/${props.user.id}` }">
      <ProfileTab :name="t('profile.menu.activeOrders')" />
    </router-link>
    <ProfileTab :name="t('profile.menu.savedCards')" @click="toggleSavedPaymentCard" />
    <ProfileTab :name="t('profile.menu.savedAddresses')" @click="toggleSavedAddresses" />
  </template>
  <template v-else>
    <router-link :to="{ path: `/my/products/${props.user.id}` }">
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

const props = defineProps<{
  user: User;
}>();

const { t } = useI18n();
const {
  toggleConfidentialityData,
  toggleSavedAddresses,
  toggleSavedPaymentCard,
} = useProfileModals();
</script>
