<template>
  <div class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]" @click="toggleSizeGuide">
    <div @click.stop class="flex w-175 flex-col gap-2 rounded-xl bg-white p-5">
      <div class="flex items-center">
        <h1 class="text-2xl font-medium">{{ t("sizeGuide.title") }}</h1>
        <img :src="close" alt="" class="ml-auto w-6.5 cursor-pointer" @click="toggleSizeGuide" />
      </div>
      <div class="mt-2.5 flex flex-col gap-2">
        <p class="text-sm leading-7">
          {{ t("sizeGuide.intro") }}
        </p>
        <div class="flex items-center justify-end gap-2 font-medium">
          <button
            type="button"
            @click="unit = 'IN'"
            :class="[
              'rounded-full px-5 py-2 text-sm tracking-widest transition duration-700',
              unit === 'IN' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black',
            ]"
          >
            {{ t("sizeGuide.inches") }}
          </button>
          <button
            type="button"
            @click="unit = 'CM'"
            :class="[
              'rounded-full px-4 py-2 text-sm tracking-widest transition duration-700',
              unit === 'CM' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black',
            ]"
          >
            {{ t("sizeGuide.cm") }}
          </button>
        </div>
        <table v-if="product" class="w-full border-collapse items-center">
          <thead>
            <tr v-if="product.category !== 'Shoes'" class="border-b border-neutral-400">
              <th class="px-4 py-4 text-left tracking-wider uppercase">{{ t("sizeGuide.size") }}</th>
              <th v-for="size in sizes" :key="size.name" class="font-dm-sans px-4 py-4 text-center tracking-wider uppercase">
                {{ size.name }}
              </th>
            </tr>
            <tr v-else class="border-b border-neutral-400">
              <th class="px-4 py-4 text-left tracking-wider uppercase">{{ t("sizeGuide.size") }}</th>
              <th v-for="size in sizesShoes" :key="size.name" class="font-dm-sans px-4 py-4 text-center tracking-wider uppercase">
                {{ size.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in formatterSizeGuide(product)" :key="row.name" class="border-b border-neutral-200 text-sm">
              <th class="px-4 py-4 text-left font-normal">
                {{ row.name }}
              </th>
              <td v-for="value in row.values" :key="value" class="font-dm-sans px-4 py-4 text-center text-neutral-600">
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-3 flex flex-col gap-2">
          <h2 class="font-medium">{{ t("sizeGuide.returnsTitle") }}</h2>
          <p class="text-sm">
            {{ t("sizeGuide.returnsText") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { sizes } from "@/shared/model/product-sizes";
import { toggleSizeGuide } from "@/entities/size-guide/lib/toggle-size-guide";
import { productSpecific } from "@/entities/product-form/model/product-specific";
import { formatterSizeGuide, unit } from "@/entities/size-guide/lib/formatter-size";
import type { Product } from "@/shared";

import close from "@/assets/icons/delete-close/delete.svg";

defineProps<{
  product: Product;
}>();

const { t } = useI18n();
const { sizesShoes } = productSpecific();
</script>
