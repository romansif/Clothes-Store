<template>
  <header class="font-raleway flex gap-56">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <div class="flex flex-col items-center gap-2 xl:items-start">
          <div class="flex gap-2 font-semibold">
            <router-link :to="{ name: 'shop' }" class="text-[#A3A3A3]">
              {{ t("nav.shop") }}
            </router-link>
            <span>/</span>
            <span v-if="route.name === 'shop/seasons-catalog'">{{ t("nav.seasonal") }}</span>
            <span v-else> New </span>
          </div>
          <h1 v-if="route.name === 'shop/seasons-catalog'" class="text-4xl font-extrabold">
            {{ t("nav.inSeasons") }}
          </h1>
          <h1 v-else class="text-4xl font-extrabold">{{ t("nav.newArrivals") }}</h1>
        </div>
      </div>
      <span class="mt-15 text-xl text-[#A3A3A3]">{{ t("nav.discoverSeasons") }}</span>
    </div>
    <div class="mt-12 flex h-10 flex-col gap-5 sm:h-35 xl:mt-0 xl:h-53.75">
      <MainSlideBar />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import MainSlideBar from "./MainSlideBar.vue";

const route = useRoute();

const { t } = useI18n();
</script>
