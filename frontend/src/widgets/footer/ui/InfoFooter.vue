<template>
  <footer class="flex items-center justify-between border-t border-white/30 p-10 text-[#A3A3A3] md:px-11 lg:px-12">
    <div class="flex items-center gap-2.5">
      <img :src="policy" alt="" />
      <span>{{ t("brand.name") }}</span>
    </div>
    <span>{{ t("info.privacyPolicy") }}</span>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import policy from "@/assets/icons/footer/privacy-policy.svg";

const { t } = useI18n();
</script>
