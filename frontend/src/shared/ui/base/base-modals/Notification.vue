<script setup lang="ts">
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";

const { notifyTitle, notifyMessage } = useProductsModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 flex justify-center items-center py-10">
    <div class="flex justify-center items-center bg-black opacity-80 w-[540px] h-[112px] p-2 rounded-lg text-white">
      <div class="flex flex-col items-center gap-4">
          <h1 class="font-medium text-lg">{{ notifyTitle }}</h1>
          <span class="font-normal ">{{ notifyMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>