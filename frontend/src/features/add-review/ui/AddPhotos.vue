<template>
  <div class="flex flex-col gap-5">
    <h2 class="text-lg">
      {{ t("reviews.addPhotos") }}
      <span class="text-[#A3A3A3]">{{ t("common.optional") }}</span>
    </h2>
    <div class="flex gap-2.5">
      <div class="mt-auto flex flex-col gap-2.5">
        <span class="text-sm text-[#A3A3A3]">{{ t("reviews.addPhotosHint") }}</span>
        <div class="flex gap-2.5">
          <div
            v-for="index in [1, 2, 3, 4]"
            :key="index"
            @click="openSelectImage(index)"
            class="h-35 w-30 cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-50 transition duration-400 hover:scale-105 hover:bg-gray-100"
          >
            <img v-if="itemPreview[index]" :src="itemPreview[index]" alt="" class="h-35 w-30 transition duration-400" />
            <div v-else class="flex justify-center py-12 font-extralight">
              <span class="text-4xl text-[#A3A3A3]">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { itemPreview, productHelper } from "@/shared/lib/product-helper";

const { t } = useI18n();
const { openSelectImage } = productHelper();
</script>
