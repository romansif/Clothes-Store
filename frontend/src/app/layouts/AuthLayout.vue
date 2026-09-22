<template>
  <Loading v-if="loading" />
  <div class="bg-white min-h-screen">
    <main class="font-raleway fixed inset-0 flex items-center justify-center">
      <div class="w-87.5 sm:w-140 rounded-lg px-4 py-8">
        <div class="flex items-center justify-center">
          <div class="w-58.75 sm:w-75">
            <AuthHeader />
          </div>
        </div>
        <div class="flex flex-col mt-10 font-bold text-3xl w-55 transition duration-400 hover:scale-110">
          <span>WELCOME TO</span>
          <span class="text-[#A3A3A3]">THE NOIR</span>
        </div>
        <router-view />
      </div>
    </main>
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/base-modal.ts";

import Loading from "@/widgets/ui/base-component/Loading.vue";
import Notification from "@/widgets/ui/base-component/Notification.vue";
import AuthHeader from "@/widgets/ui/auth/AuthHeader.vue";

const { loading, notify } = useBaseModals();
</script>

<style scoped>

</style>