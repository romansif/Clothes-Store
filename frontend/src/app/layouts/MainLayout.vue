<template>
  <div class="bg-[#F0F0F0] min-h-screen">
    <div class="font-raleway xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <router-view />
    </div>
  </div>
  <Transition name="modal">
    <Notification v-if="notify" />
  </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/base-modal.ts";

import MainNavBar from "@/widgets/ui/navigation/MainNavBar.vue";
import Notification from "@/shared/ui/Notification.vue";

const { notify } = useBaseModals();
</script>

<style scoped>

</style>