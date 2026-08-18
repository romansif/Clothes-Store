<script setup lang="ts">
import { useBaseModals } from "@/shared/composables/modals/base.modals";
import { authStore } from "@/shared/composables/stores/auth.store.ts";

import SignUpBuyer from "@/feature/auth/signUp/SignUpBuyer.vue";
import SignUpSeller from "@/feature/auth/signUp/SignUpSeller.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";

const { showSignSection } = authStore();
const { loading, notify } = useBaseModals();
</script>

<template>
  <SignUpBuyer v-if="!showSignSection.signUp" />
  <SignUpSeller v-if="showSignSection.signUp" />
  <Loading v-if="loading"/>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>

</style>