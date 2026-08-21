<template>
  <div class="flex gap-10">
    <div class="flex flex-col gap-4 mt-4 w-full">
      <div class="flex gap-2">
        <div v-if="!user.companyName" class="flex gap-2 w-full ">
          <span class="font-semibold text-lg">Email:</span>
          <span class="font-medium text-lg text-[#A3A3A3]">{{ user.email }}</span>
        </div>
        <span v-if="user.companyName" class="font-semibold text-lg">Company Name:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.companyName }}</span>
      </div>
      <div v-if="user.publicPhone" class="flex gap-2 w-84">
        <span class="font-semibold text-lg">Public Phone:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.publicPhone }}</span>
      </div>
      <div v-if="user.privatePhone" class="flex gap-2 w-84">
        <span class="font-semibold text-lg">Private Phone:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.privatePhone }}</span>
      </div>
      <div v-if="user.role === 'Buyer'" class="flex gap-2 w-full">
        <span class="font-semibold text-lg">Email:</span>
        <span class="font-medium text-lg text-[#A3A3A3]">{{ user.email }}</span>
      </div>
    </div>
    <div v-if="user.companyName" class="flex gap-2 mt-15 w-full ">
      <span class="font-semibold text-lg">Email:</span>
      <span class="font-medium text-lg text-[#A3A3A3]">{{ user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = usersStore();

import { usersStore } from "@/feature/profile/model/users.store.ts";
</script>

<style scoped>

</style>