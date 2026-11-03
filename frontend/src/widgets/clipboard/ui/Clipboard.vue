<template>
  <div class="font-montserrat fixed inset-0 z-60 flex items-center justify-center">
    <div class="rounded-xl bg-black px-6 py-2 opacity-80">
      <h1 class="text-white">{{ t("orders.trackingCopied") }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
