<template>
  <div class="flex w-full flex-col gap-6 rounded bg-white p-6.5 shadow-xl">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold">{{ t("productForm.imageSlots") }}</h1>
      <h2 class="text-sm font-medium text-[#A3A3A3]">
        {{ t("productForm.imageSlotsHint") }}
      </h2>
    </div>
    <div class="flex gap-6">
      <div
        class="h-90 w-90 cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-50 transition duration-400 hover:scale-105 hover:bg-gray-100"
        @click="openSelectImage(1)"
      >
        <img v-if="itemPreview[1]" :src="itemPreview[1]" alt="" class="h-90 w-90 transition duration-400" />
        <div v-else class="p-4 text-mauve-100">
          <span class="rounded-full bg-black px-2 py-1.5 font-bold">{{ t("productForm.mainPhoto") }}</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="index in [2, 3, 4, 5]"
          :key="index"
          class="h-43.5 w-43.5 cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-50 transition duration-400 hover:scale-105 hover:bg-gray-100"
          @click="openSelectImage(index)"
        >
          <img v-if="itemPreview[index]" :src="itemPreview[index]" alt="" class="h-43.5 w-43.5 transition duration-400" />
          <div v-else class="p-4 text-mauve-500">
            <span class="rounded-full border border-gray-400 bg-gray-100 px-2 py-1.5 font-bold">
              {{ t("productForm.photo", index) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-sm font-medium text-[#A3A3A3]">
        {{ t("productForm.firstPhotoHint") }}
      </h2>
      <h2 class="text-sm font-medium text-[#A3A3A3]">
        {{ t("productForm.formats") }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { itemPreview, productHelper } from "@/shared/lib/product-helper";

const { t } = useI18n();
const { openSelectImage } = productHelper();
</script>
