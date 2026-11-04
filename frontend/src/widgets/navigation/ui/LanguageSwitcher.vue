<template>
  <div class="font-raleway flex items-center gap-1.5 rounded-full border border-gray-300 p-1 text-sm font-semibold">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      :class="[
        'cursor-pointer rounded-3xl border-2 border-black p-2.5 px-4 transition duration-400',
        locale === lang.code ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white',
      ]"
      @click="setLocale(lang.code)"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { setLocale, type AppLocale } from "@/shared/i18n";

const { locale } = useI18n();

const languages: { code: AppLocale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];
</script>
