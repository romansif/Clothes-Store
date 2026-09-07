<template>
  <div class="flex gap-10 font-semibold text-lg">
    <div class="flex flex-col gap-4 mt-4 w-full">
      <div class="flex gap-2">
        <span>Role:</span>
        <span>
          {{ user?.role }}
        </span>
      </div>
      <div v-if="user?.role === 'Seller'" class="flex gap-2">
        <span>Company:</span>
        <span>NOIR</span>
      </div>
      <div v-if="user?.role === 'Buyer'" class="flex gap-2">
        <div v-if="hasPhone">
          <span>Phone:</span>
          <span>{{ user.phone }}</span>
        </div>
        <span v-else class="font-medium text-sm opacity-50">
          Phone not provided
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-4 mt-4 w-full">
      <div v-if="user?.role === 'Seller'" class="flex gap-2">
        <div v-if="hasPhone">
          <span>Phone:</span>
          <span>{{ user.phone }}</span>
        </div>
        <span v-else class="font-medium text-sm opacity-50">
          Phone not provided
        </span>
      </div>
      <div class="flex gap-2 w-full">
        <span>Email:</span>
        <span>{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = userStore();

import { computed } from "vue";
import { userStore } from "@/entities/profile/model/user.store.ts";

const hasPhone = computed(() => Boolean(user.value?.phone))
</script>

<style scoped>

</style>