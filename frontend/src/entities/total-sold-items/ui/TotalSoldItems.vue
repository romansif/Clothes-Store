<template>
  <section class="font-raleway flex w-xl flex-col gap-1.5">
    <h3 class="text-lg font-semibold">{{ t("myProduct.totalTitle") }}</h3>
    <div class="flex flex-col gap-1.5  w-fit rounded-xl bg-white border-2 border-gray-300 py-1.5 font-medium">
      <div class="flex flex-col items-center gap-1.5 border-b-2 border-gray-300 px-5">
        <h4 class="text-[#A3A3A3]">{{ t("myProduct.sold") }}</h4>
        <div class="flex items-end gap-1.5">
          <span class="font-dm-sans text-xl font-bold">{{ totalSoldQuantity }}</span>
          <span class="text-sm text-[#A3A3A3]">{{ t("common.pcs") }}</span>
        </div>
      </div>
      <div class="flex flex-col items-center gap-1.5 px-5">
        <h4 class="text-[#A3A3A3]">{{ t("myProduct.revenue") }}</h4>
        <span class="font-dm-sans text-xl font-bold text-[#8C6A3F]">$ {{ totalSoldTotalPrice }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSoldItems } from "@/shared/lib/use-sold-item";

const { t } = useI18n()
const { totalSoldQuantity, totalSoldTotalPrice } = useSoldItems()
</script>


