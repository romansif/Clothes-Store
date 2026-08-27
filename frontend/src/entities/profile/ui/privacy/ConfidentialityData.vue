<template>
  <div class="flex gap-10">
    <div class="flex flex-col gap-4 mt-4 w-full">
      <div class="flex gap-2 w-84">
        <span class="font-semibold text-lg">Phone:</span>
        <span class="font-medium text-lg text-[#A3A3A3] font-dm-sans">{{ user.phone }}</span>
      </div>
      <div class="flex gap-2 w-full ">
        <span class="font-semibold text-lg">Email:</span>
        <span class="font-medium text-lg text-[#A3A3A3] font-dm-sans">{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = userStore();

import { userStore } from "@/entities/profile/model/user.store.ts";
</script>

<style scoped>

</style>