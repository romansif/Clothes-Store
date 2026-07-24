<script setup lang="ts">
import { usersStore } from "../../../../shared/composables/stores/users.store.ts";

const { userCheckout } = usersStore();
</script>

<template>
  <div class="flex flex-col mt-8 gap-5">
    <div class="flex flex-col px-3 py-6 border border-gray-200 rounded-xl bg-white">
      <div class="flex justify-between">
        <span class="font-semibold">
          SHIP TO
        </span>
        <router-link :to="{name: 'information'}" class="text-xs text-gray-500">
          Change
        </router-link>
      </div>
      <span class="text-xs text-gray-500">
        {{ userCheckout.country }}, {{ userCheckout.city }}, {{ userCheckout.address }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>