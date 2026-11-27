<template>
  <div class="flex flex-col gap-15 px-10 py-10 md:px-11 lg:px-12">
    <div class="flex flex-col gap-5">
      <h1 class="text-6xl font-extrabold">{{ t("footer.pricing") }}</h1>
      <p class="w-180 text-xl font-medium text-[#A3A3A3]">{{ t("info.aboutPrices.pricesHint") }}</p>
    </div>
    <div class="flex flex-col gap-10 pb-10">
      <h2 class="border-b border-white/30 pb-10 text-4xl font-extrabold">{{ t("info.aboutPrices.catalog") }}</h2>
      <ul class="flex flex-col gap-15">
        <li v-for="item in CATALOG" class="flex items-center justify-between border-b border-white/30 pb-10">
          <h3 class="text-2xl font-bold">
            {{ t(item.name) }}
          </h3>
          <span class="font-dm-sans text-2xl text-[#A3A3A3]">
            {{ t(item.price) }}
          </span>
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-10">
      <h2 class="text-4xl font-extrabold">{{ t("info.aboutPrices.delivery") }}</h2>
      <ul class="flex items-center gap-15 border-b border-white/30 pb-15">
        <li
          v-for="item in DELIVERY"
          class="flex h-45 w-full flex-col gap-5 rounded-xl border border-white/30 px-10 py-5"
        >
          <span class="text-xl font-semibold text-[#A3A3A3]">
            {{ t(item.name) }}
          </span>
          <h2 class="font-dm-sans text-4xl">
            {{ t(item.price) }}
          </h2>
          <span class="text-xl font-medium text-[#A3A3A3]">
            {{ t(item.text) }}
          </span>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-between pb-15">
      <h2 class="text-4xl font-extrabold">{{ t("info.aboutPrices.exactPrice") }}</h2>
      <UiButton :name="t('footer.nfc')" variant="nearField" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { UiButton } from "@/shared/ui/button";

const { t } = useI18n();

const CATALOG = [
  { name: "info.aboutPrices.outerWear", price: "info.aboutPrices.outerWearPrice" },
  { name: "info.aboutPrices.underWear", price: "info.aboutPrices.underWearPrice" },
  { name: "info.aboutPrices.trousers&jeans", price: "info.aboutPrices.trousers&jeansPrice" },
  { name: "info.aboutPrices.shoes", price: "info.aboutPrices.shoesPrice" },
];

const DELIVERY = [
  { name: "info.aboutPrices.standard", price: "info.aboutPrices.standardPrice", text: "info.aboutPrices.standardTerm" },
  { name: "info.aboutPrices.express", price: "info.aboutPrices.expressPrice", text: "info.aboutPrices.expressTerm" },
];
</script>
