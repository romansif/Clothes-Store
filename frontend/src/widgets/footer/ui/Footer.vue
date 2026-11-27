<template>
  <footer class="font-raleway relative overflow-hidden bg-[#0E0E0E] px-3 pb-3 text-white md:px-6 md:pb-6">
    <div class="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-40 -bottom-40 h-112 w-md rounded-full bg-white/5 blur-3xl"></div>
    <div class="relative grid gap-14 px-8 py-14 md:grid-cols-[1fr_1.5fr_0.5fr] md:gap-10 md:px-14 md:py-16 lg:px-20">
      <div class="flex flex-col gap-8">
        <span class="text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
          {{ t("footer.info") }}
        </span>
        <ul class="flex flex-col gap-5">
          <li v-for="item in LINKS" :key="item">
            <router-link :to="{ name: item.link }"
              class="group inline-flex cursor-pointer items-center gap-3 text-3xl font-semibold text-white/80 transition-all duration-300 hover:translate-x-2 hover:text-white"
            >
              {{ t(item.name) }}
              <img
                :src="arrow_link"
                alt=""
                class="h-6 w-6 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </router-link>
          </li>
        </ul>
      </div>
      <div class="hidden flex-col gap-6 md:flex">
        <span class="text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
          {{ t("footer.technologies") }}
        </span>
        <div class="flex flex-col leading-[0.85]">
          <span
            class="cursor-default text-[88px] font-black text-transparent transition-all duration-500 [-webkit-text-stroke:2px_rgba(255,255,255,0.3)] hover:translate-x-4 hover:text-white lg:text-[110px]"
          >
            VR
          </span>
          <div class="flex items-center gap-6">
            <span
              class="cursor-default text-[88px] font-black text-white transition-all duration-500 hover:translate-x-4 lg:text-[110px]"
            >
              XIV
            </span>
            <button
              class="rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              {{ t("footer.nfc") }}
            </button>
          </div>
          <span
            class="cursor-default text-[88px] font-black text-transparent transition-all duration-500 [-webkit-text-stroke:2px_rgba(255,255,255,0.3)] hover:translate-x-4 hover:text-white lg:text-[110px]"
          >
            QR
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-8">
        <span class="text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
          {{ t("footer.languages") }}
        </span>
        <LanguageSwitcher class="w-50" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { LanguageSwitcher } from "@/widgets/navigation/index.ts";

import arrow_link from "@/assets/icons/footer/arrow-up-right.svg";

const { t } = useI18n();

const LINKS = [
  { link: 'about', name: "footer.pricing" },
  { link: 'prices', name: "footer.about"},
  { link: 'contacts', name: "footer.contacts"}
];
</script>
