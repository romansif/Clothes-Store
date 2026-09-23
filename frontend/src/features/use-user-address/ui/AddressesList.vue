<template>
  <Transition name="view">
    <div v-if="!userAddressesCity" class="flex justify-center pt-35">
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
    <ul v-else class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
      <AddressItem v-for="address in userAddresses" :address="address"
                     @delete-address="toggleDeleteChoice"  />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

import AddressItem from "@/entities/user-address/ui/AddressItem.vue";
import icon_address from "@/assets/icons/checkout/icon_address.svg";

const { toggleDeleteChoice } = baseDeleteModal();
const { userAddresses } = informationContactStore();

const userAddressesCity = computed(() => {
  return userAddresses.value.some(item => 'city' in item);
});
</script>

<style scoped>

</style>