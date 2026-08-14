<script setup lang="ts">
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";

import Loading from "@/shared/ui/base/base-modals/Loading.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";
import SignIn from "@/feature/auth/signIn/SignIn.vue";
import SignInWithPhone from "@/feature/auth/signIn/SignInWithPhone.vue";

const { loading, notify } = useBaseModals();
</script>

<template>
  <SignIn />
  <SignInWithPhone />
  <Loading v-if="loading"/>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>

</style>