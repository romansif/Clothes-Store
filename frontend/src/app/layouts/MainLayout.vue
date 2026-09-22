<template>
  <div class="bg-[#F0F0F0] min-h-screen">
    <div v-if="componentError" class="flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
      <p class="text-sm mb-4">{{ componentError }}</p>
      <BaseButton name="Try again" variant="refresh" @click="resetError('CART_FAVORITE')" />
    </div>
    <div v-else class="font-raleway xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <router-view />
    </div>
  </div>
  <Transition name="notify">
    <Notification v-if="notify" />
  </Transition>
</template>

<script setup lang="ts">
import { errorHandler } from "@/shared/lib/error-handler.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";

import MainNavBar from "@/widgets/ui/navigation/MainNavBar.vue";
import BaseButton from "@/shared/ui/base/BaseButton.vue";
import Notification from "@/widgets/ui/base-component/Notification.vue";

const { notify } = useBaseModals();
const { componentError, resetError } = errorHandler();
</script>

<style scoped>

</style>