<template>
  <div class="font-raleway relative inline-grid grid-flow-col auto-cols-fr items-center
       gap-2 rounded-full border border-white p-1 bg-white text-sm font-semibold">
    <span class="pointer-events-none absolute left-1 top-1 bottom-1
          rounded-full bg-black
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          :style="indicatorStyle"/>

    <button v-for="lang in languages"
            :key="lang.code"
            type="button"
            :class="['relative z-10 cursor-pointer rounded-full border-2 border-transparent',
            'px-4 py-2.5 transition-colors duration-300',
            locale === lang.code ? 'text-white' : 'text-black']"
        @click="setLocale(lang.code)"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { setLocale } from "@/shared/i18n";
import { useSwitcher, languages } from "@/widgets/navigation/lib/use-switcher";

const { locale } = useI18n();
const { indicatorStyle } = useSwitcher()
</script>