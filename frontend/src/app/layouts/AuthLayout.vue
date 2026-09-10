<template>
  <div class="bg-white h-screen">
    <main class="font-raleway fixed inset-0 flex items-center justify-center">
      <router-view />
    </main>
    <Loading v-if="loading"/>
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/base.modal.ts";

import Loading from "@/widgets/Loading.vue";
import Notification from "@/shared/ui/Notification.vue";

const { loading, notify } = useBaseModals();
</script>

<style scoped>

</style>