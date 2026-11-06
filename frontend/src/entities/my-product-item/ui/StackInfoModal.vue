<template>
  <div
    v-if="product"
    class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    @click="toggleStackInfo"
  >
    <div @click.stop class="flex flex-col gap-4 rounded-xl bg-white p-5">
      <div class="flex items-start">
        <div class="flex flex-col gap-2.5">
          <h3 class="font-dm-sans">
            {{ t("product.totalStockQuantity") }} (<span class="text-blue-700">{{ useStackInfo(product) }}</span
            >)
          </h3>
          <h1 class="text-2xl font-medium">{{ t("product.stockQuantity") }}</h1>
        </div>
        <img :src="close" alt="" class="ml-auto w-6.5 cursor-pointer" @click="toggleStackInfo" />
      </div>
      <div class="border border-gray-300"></div>
      <div class="grid grid-cols-4 gap-x-4 gap-y-6">
        <div
          v-for="variant in product.variants"
          :key="variant.hex + variant.size"
          class="flex cursor-default items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-4 text-xs leading-tight font-bold"
        >
          <div
            class="h-6 w-6 rounded-full border-2 border-gray-200 shadow-sm"
            :style="{ backgroundColor: variant.hex }"
          ></div>
          <span>{{ variant.colorName }}</span>
          <span>{{ variant.size }}</span>
          <span class="font-dm-sans">{{ variant.count }} pcs.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useStackInfo } from "@/entities/my-product-item/lib/use-stack-info";
import { toggleStackInfo } from "@/entities/my-product-item/lib/toggle-stack-info";
import type { Product } from "@/shared";

import close from "@/assets/icons/delete-close/delete.svg";

defineProps<{
  product: Product;
}>();

const { t } = useI18n();
</script>
