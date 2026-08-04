<script setup lang="ts">
import { useBaseModals } from "@/shared/composables/modals/base.modals";

import SignUpBuyer from "@/feature/auth/signUp/SignUpBuyer.vue";
import SignUpSeller from "@/feature/auth/signUp/SignUpSeller.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";

const { loading, notify } = useBaseModals();
</script>

<template>
  <SignUpBuyer />
  <SignUpSeller />
  <Loading v-if="loading"/>
  <Transition>
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>