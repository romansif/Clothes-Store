<template>
  <ul v-if="userAddressesCity" class="flex flex-col overflow-y-auto no-scrollbar h-92.5 pb-4">
    <AddressesItem />
  </ul>
  <div v-else class="flex justify-center pt-35">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_address" alt="" class="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You have no saved address</span>
        <span class="text-[#A3A3A3]">
          It’s the perfect time to place your first order.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userAddresses } = checkoutStore();

import { computed } from "vue";
import { checkoutStore } from "@/feature/checkout/model/checkout.store.ts";

import AddressesItem from "./AddressesItem.vue";
import icon_address from "@/assets/icons/checkout/icon_address.svg";

const userAddressesCity = computed(() => {
  return userAddresses.value.some(item => 'city' in item);
});
</script>

<style scoped>

</style>