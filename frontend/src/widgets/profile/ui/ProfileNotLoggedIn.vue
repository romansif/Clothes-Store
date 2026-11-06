<template>
  <div class="font-raleway flex justify-center py-46">
    <div
      class="flex w-87.5 items-center justify-between rounded-xl bg-white px-12 py-8 sm:w-150 md:w-175 lg:w-237.5 xl:w-175"
    >
      <div class="flex flex-col items-center gap-4">
        <img :src="not_avatar" alt="" class="w-20 rounded-full" />
      </div>
      <div class="flex gap-10 font-medium">
        <router-link :to="{ name: 'signIn' }" class="transition duration-400 hover:scale-108">
          <span class="rounded-xl border border-gray-300 px-12 py-3">{{ t("nav.login") }}</span>
        </router-link>
        <router-link :to="{ name: 'signUp' }" class="transition duration-400 hover:scale-108">
          <span class="rounded-xl border border-gray-300 px-5 py-3">{{ t("nav.registration") }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import not_avatar from "@/assets/icons/nav/default-avatar.png";

const { t } = useI18n();
</script>
