<script setup lang="ts">
import { computed } from "vue";
import { usersStore } from "../../../../composables/stores/users.store.ts";

import AddressesCard from "./AddressesCard.vue";
import icon_address from "../../../../../app/assets/icons/icon_address.svg";

const { userAddresses } = usersStore();
const userAddressesCity = computed(() => {
  return userAddresses.value.some(item => 'city' in item);
});
</script>

<template>
  <ul v-if="userAddressesCity" class="flex flex-col overflow-y-auto no-scrollbar h-[370px] pb-4">
    <AddressesCard />
  </ul>
  <div v-else class="flex justify-center pt-35">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_address" alt="" class="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You have no saved addresses</span>
        <span class="text-[#A3A3A3]">It’s the perfect time to place your first order.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>