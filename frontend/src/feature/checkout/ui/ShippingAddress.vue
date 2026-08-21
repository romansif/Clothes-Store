<template>
  <div class="flex flex-col mt-8 gap-5">
    <div class="flex flex-col px-3 py-6 border border-gray-300 rounded-xl
          transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50">
      <div class="flex justify-between">
        <span class="font-semibold">
          SHIP TO
        </span>
        <router-link :to="{name: 'information'}" class="text-xs text-gray-500">
          Change
        </router-link>
      </div>
      <span class="text-xs text-gray-500">
        {{ userAddress?.country }}, {{ userAddress?.address }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userAddress } = checkoutStore();

import { checkoutStore } from "@/feature/checkout/model/checkout.store.ts";
</script>

<style scoped>

</style>