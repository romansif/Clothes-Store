<template>
  <div class="min-h-screen bg-white">
    <main class="font-raleway fixed inset-0 flex items-center justify-center">
      <div :class="['rounded-lg px-4 py-8', isLogin ? 'w-105' : 'w-87.5 sm:w-140']">
        <div class="flex items-center justify-center">
          <div class="w-58.75 sm:w-68.75">
            <AuthHeader />
          </div>
        </div>
        <div class="mt-10 flex w-62 flex-col text-3xl font-bold transition duration-400 hover:scale-110">
          <span>{{ t("auth.welcomeTo") }}</span>
          <span class="text-[#A3A3A3]">{{ t("brand.name") }}</span>
        </div>
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { AuthHeader } from "@/widgets/auth-header";

const route = useRoute();

const { t } = useI18n();

const isLogin = computed(() => route.name === "signIn");
</script>
