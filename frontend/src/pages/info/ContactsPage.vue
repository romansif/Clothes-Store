<template>
  <div class="flex flex-col gap-15 px-10 py-10 md:px-11 lg:px-12">
    <div class="flex flex-col gap-5">
      <h1 class="text-6xl font-extrabold">{{ t("footer.contacts") }}</h1>
      <div class="flex items-center justify-between">
        <p class="w-180 text-xl font-medium text-[#A3A3A3]">{{ t("info.contacts.contactsHint") }}</p>
        <UiButton :name="t('footer.nfc')" variant="nearField" />
      </div>
    </div>
    <ul class="flex items-center gap-10 border-b border-white/30 pb-15">
      <li v-for="item in INFO" class="flex h-35 w-85 flex-col gap-2.5 rounded-xl border border-white/30 px-10 py-5">
        <span class="text-lg font-semibold text-[#A3A3A3]">
          {{ t(item.name) }}
        </span>
        <h2 class="font-dm-sans w-50 text-xl">
          {{ t(item.text) }}
        </h2>
      </li>
    </ul>
    <div class="flex items-center justify-between">
      <p class="w-180 text-xl font-medium text-[#A3A3A3]">{{ t("info.contacts.socialMedia") }}</p>
      <ul class="flex items-center gap-5">
        <li v-for="item in SOCIAL_MEDIA">
          <UiButton :name="t(item.name)" variant="socialMedia" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { UiButton } from "@/shared/ui/button";

const { t } = useI18n();

const INFO = [
  { name: "info.contacts.address", text: "info.contacts.companyAddress" },
  { name: "info.contacts.phone", text: "info.contacts.companyPhone" },
  { name: "info.contacts.email", text: "info.contacts.companyEmail" },
  { name: "info.contacts.hoursWors", text: "info.contacts.mn-fr&st-sn" },
];

const SOCIAL_MEDIA = [
  { name: "info.contacts.telegram" },
  { name: "info.contacts.whatsApp" },
  { name: "info.contacts.instagram" },
];
</script>
