<script setup lang="ts">
import { useBaseModals } from "@/shared/composables/modals/base.modals";

const {  notifyTitle, notifyMessage } =  useBaseModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 flex justify-center items-center ">
    <div class="flex justify-center items-center bg-black opacity-70 w-137.5 h-32.5 px-10 rounded-lg text-white">
      <div class="flex flex-col items-center gap-3">
        <h1 class="font-medium text-lg text-center">{{ notifyTitle }}</h1>
        <span class="font-normal text-center">{{ notifyMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>