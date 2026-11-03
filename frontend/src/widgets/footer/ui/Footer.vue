<template>
  <footer class="font-raleway mt-30 flex items-center justify-center bg-[#F5F5F5]">
    <div class="w-75 py-20 md:w-175 lg:w-250">
      <div class="flex items-center gap-50 md:gap-60 lg:gap-100">
        <div class="grid grid-cols-2 gap-30 md:flex md:flex-col md:gap-15">
          <div class="flex flex-col gap-6 font-medium">
            <span class="text-[#A3A3A3]">{{ t("footer.info") }}</span>
            <div class="flex flex-col gap-2 text-gray-600">
              <span class="cursor-pointer transition duration-400 hover:scale-115">{{ t("footer.pricing") }}</span>
              <span class="cursor-pointer transition duration-400 hover:scale-115">{{ t("footer.about") }}</span>
              <span class="cursor-pointer transition duration-400 hover:scale-115">{{ t("footer.contacts") }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-6 font-medium">
            <span class="text-[#A3A3A3]">{{ t("footer.languages") }}</span>
            <div class="flex flex-col items-start gap-2 text-gray-600">
              <button @click="setLocale('en')" class="cursor-pointer transition duration-400 hover:scale-115">{{ t("footer.en") }} /</button>
              <button @click="setLocale('ru')" class="cursor-pointer transition duration-400 hover:scale-115">{{ t("footer.ru") }} /</button>
            </div>
          </div>
        </div>
        <div class="hidden md:flex md:flex-col md:items-start md:font-medium">
          <span class="font-medium text-[#A3A3A3]">{{ t("footer.technologies") }}</span>
          <div class="flex flex-col items-start">
            <span class="text-[80px] font-black text-[#D9D9D9]">VR</span>
            <div class="flex gap-5">
              <span class="text-[80px] font-black">XIV</span>
              <span class="mt-10 font-medium text-gray-600">{{ t("footer.nfc") }}</span>
            </div>
            <span class="text-[80px] font-black">QR</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { setLocale } from "@/shared/i18n/index.ts";

const { t } = useI18n();
</script>
