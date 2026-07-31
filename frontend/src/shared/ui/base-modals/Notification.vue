<script setup lang="ts">
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";

import star from '@/app/assets/icons/notification/star.svg';

const { notifyTitle, notifyMessage } = useProductsModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 flex justify-center items-center py-10">
    <div class="bg-black opacity-80 w-[607px] h-[112px] p-2 rounded-lg text-white">
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <img :src="star" alt="" class="w-[30px]">
          <h1 class="font-bold">{{ notifyTitle }}</h1>
        </div>
        <div class="flex p-2">
          <span class="font-medium text-sm">{{ notifyMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>