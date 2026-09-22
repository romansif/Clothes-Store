<template>
  <div class="flex flex-col mt-8">
    <div class="flex flex-col gap-1 px-3 py-6 border border-gray-400 rounded-xl
          transition duration-400 bg-gray-50 hover:bg-white font-dm-sans">
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
import type {UserContactInfo} from "@/entities/checkout-contact-info/model/address.types.ts";

defineProps<{
  userAddress: UserContactInfo | null;
}>();
</script>

<style scoped>

</style>