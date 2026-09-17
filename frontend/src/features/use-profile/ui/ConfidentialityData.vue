<template>
  <template v-if="user">
    <div class="flex gap-10 font-semibold text-lg font-dm-sans">
      <div class="flex flex-col gap-4 mt-4 w-full">
        <div class="flex gap-2">
          <span>Role:</span>
          <span>
            {{ user.role }}
          </span>
        </div>
        <div v-if="user.role === 'Seller'" class="flex gap-2">
          <span>Company:</span>
          <span>NOIR</span>
        </div>
        <div v-if="user.role === 'Buyer'" class="flex gap-2">
          <div v-if="user.phone" class="flex gap-2">
            <span>Phone:</span>
            <span>{{ user.phone }}</span>
          </div>
          <span v-else class="font-medium text-sm opacity-50">
            Phone not provided
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-4 w-full">
        <div v-if="user.role === 'Seller'" class="flex gap-2">
          <div v-if="user.phone" class="flex gap-2">
            <span>Phone:</span>
            <span>{{ user.phone }}</span>
          </div>
          <span v-else class="font-medium text-sm opacity-50">
            Phone not provided
          </span>
        </div>
        <div class="flex gap-2">
          <span>Email:</span>
          <span>{{ user.email }}</span>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type {User} from "@/features/use-profile/model/user.types.ts";

defineProps<{
  user: User | null;
}>();
</script>

<style scoped>

</style>