<template>
  <Loading v-if="loading" />
  <div class="bg-white min-h-screen">
    <main class="font-raleway fixed inset-0 flex items-center justify-center">
      <div :class="['rounded-lg px-4 py-8', isLogin ? 'w-105' : 'w-87.5 sm:w-140']">
        <div class="flex items-center justify-center">
          <div class="w-58.75 sm:w-68.75">
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
    <Transition name="modal">
      <Notification v-if="notify" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBaseModals } from "@/shared/lib/base-modal.ts";

import Loading from "@/shared/ui/Loading.vue";
import Notification from "@/shared/ui/Notification.vue";
import AuthHeader from "@/widgets/ui/auth/AuthHeader.vue";

const route = useRoute();

const { loading, notify } = useBaseModals();

const isLogin = computed(() => route.name === "signIn")
</script>

<style scoped>

</style>