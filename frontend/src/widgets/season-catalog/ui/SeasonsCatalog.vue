<template>
  <div
    v-for="season in seasonsCatalog"
    :key="season.id"
    @click="router.push({ name: `${season.route}` })"
    class="font-montserrat h-100 w-92 cursor-pointer rounded-2xl text-white transition duration-500 hover:scale-108"
    :style="{ backgroundImage: `url(${season.url})` }"
  >
    <div style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))" class="flex flex-col gap-25 px-8 py-12">
      <div class="flex items-center gap-3">
        <span>{{ t(season.id) }}</span>
        <div class="w-15 border-2 border-b"></div>
      </div>
      <div class="flex flex-col gap-10">
        <h1 class="text-3xl font-semibold">{{ t(season.title) }}</h1>
        <p class="text-md font-medium">{{ t(season.text) }}</p>
        <span class="cursor-pointer font-medium">{{ t("nav.viewCollection") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import router from "@/app/router";
import { seasonsCatalog } from "@/widgets/navigation/model/seasons-specific";

const { t } = useI18n();
</script>
