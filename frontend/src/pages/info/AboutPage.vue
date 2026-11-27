<template>
  <div class="flex flex-col gap-15 py-10 px-10 md:px-11 lg:px-12">
    <div class="flex flex-col gap-5">
      <h1 class="text-6xl font-extrabold">{{ t("footer.about") }}</h1>
      <p class="text-xl text-[#A3A3A3] w-180 font-medium">{{ t("info.about.aboutHint")}}</p>
    </div>
    <div class="flex items-center gap-25">
      <div class="bg-[#151515] w-150 h-80 rounded-xl">
        <img :src="collection" alt="" class="rounded-2xl">
      </div>
      <div class="flex flex-col gap-5">
        <h2 class="text-4xl font-extrabold">{{ t("info.about.ourHistory") }}</h2>
        <p class="text-xl text-[#A3A3A3] w-180 font-medium">{{ t("info.about.history") }}</p>
        <p class="text-xl text-[#A3A3A3] w-180 font-medium">{{ t("info.about.historyDifference") }}</p>
      </div>
    </div>
    <ul class="grid grid-cols-3 gap-10 pb-15 border-b border-white/30">
      <li v-for="item in CHERISH" class="flex flex-col gap-2.5 px-10 py-5 h-45 border border-white/30 rounded-xl">
        <span class="text-lg font-semibold text-[#A3A3A3]">
          {{ t(item.name) }}
        </span>
        <h2 class="font-dm-sans text-xl">
          {{ t(item.text) }}
        </h2>
      </li>
    </ul>
    <div class="flex items-center justify-between pb-15">
      <h2 class="text-4xl font-extrabold">{{ t("info.about.remainQuestion") }}</h2>
      <button
          class="rounded-full border border-white/30 px-8 py-4 font-semibold text-white/70 transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
      >
        {{ t("footer.nfc") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import collection from "@/assets/photos/season-catalogs/collection.png"

const { t } = useI18n()

const CHERISH = [
  { name: "info.about.quality", text: "info.about.qualityText" },
  { name: "info.about.minimalistic", text: "info.about.minimalisticText" },
  { name: "info.about.service", text: "info.about.serviceText" }
]
</script>
