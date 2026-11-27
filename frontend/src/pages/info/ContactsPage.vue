<template>
  <div class="flex flex-col gap-15 py-10 px-10 md:px-11 lg:px-12">
    <div class="flex flex-col gap-5">
      <h1 class="text-6xl font-extrabold">{{ t("footer.contacts") }}</h1>
      <div class="flex items-center justify-between">
        <p class="text-xl text-[#A3A3A3] w-180 font-medium">{{ t("info.contacts.contactsHint")}}</p>
        <button
            class="rounded-full border border-white/30 px-8 py-4 font-semibold text-white/70 transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
        >
          {{ t("footer.nfc") }}
        </button>
      </div>
    </div>
    <ul class="flex items-center gap-10 pb-15 border-b border-white/30">
      <li v-for="item in INFO" class="flex flex-col gap-2.5 px-10 py-5 h-35 w-85 border border-white/30 rounded-xl">
        <span class="text-lg font-semibold text-[#A3A3A3]">
          {{ t(item.name) }}
        </span>
        <h2 class="w-50 font-dm-sans text-xl">
          {{ t(item.text) }}
        </h2>
      </li>
    </ul>
    <div class="flex items-center justify-between">
      <p class="text-xl text-[#A3A3A3] w-180 font-medium">{{ t("info.contacts.socialMedia") }}</p>
      <ul class="flex items-center gap-5">
        <li v-for="item in SOCIAL_MEDIA" class="px-6 py-4 border border-white/30 font-semibold text-sm rounded-full">
          {{ t(item.name) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const INFO = [
  { name: "info.contacts.address", text: "info.contacts.companyAddress" },
  { name: "info.contacts.phone", text: "info.contacts.companyPhone" },
  { name: "info.contacts.email", text: "info.contacts.companyEmail" },
  { name: "info.contacts.hoursWors", text: "info.contacts.mn-fr&st-sn" },
]

const SOCIAL_MEDIA = [
  { name: "info.contacts.telegram" },
  { name: "info.contacts.whatsApp" },
  { name: "info.contacts.instagram" },
]
</script>
