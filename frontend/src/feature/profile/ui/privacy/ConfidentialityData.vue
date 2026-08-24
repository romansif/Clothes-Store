<template>
  <div class="flex gap-10">
    <div class="flex flex-col gap-4 mt-4 w-full">
      <div class="flex gap-2">
        <span v-if="user.role === 'Seller'" class="font-semibold text-lg">Company Name:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.companyName }}</span>
      </div>
      <div v-if="user.role === 'Seller'" class="flex gap-2 w-84">
        <span class="font-semibold text-lg">Public Phone:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.publicPhone }}</span>
      </div>
      <div v-if="user.role === 'Buyer'" class="flex gap-2 w-84">
        <span class="font-semibold text-lg">Private Phone:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.privatePhone }}</span>
      </div>
      <div v-if="user.role === 'Buyer'" class="flex gap-2 w-full">
        <span class="font-semibold text-lg">Email:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.email }}</span>
      </div>
    </div>
    <div v-if="user.role === 'Seller'" class="flex gap-2 mt-15 w-full ">
      <span class="font-semibold text-lg">Email:</span>
      <span class="font-medium text-lg text-[#A3A3A3]">{{ user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = userStore();

import { userStore } from "@/feature/profile/model/user.store.ts";
</script>

<style scoped>

</style>