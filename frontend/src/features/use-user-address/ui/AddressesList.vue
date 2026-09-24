<template>
  <Transition name="view">
    <ul class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
      <AddressItem v-for="address in userAddresses" :address="address"
                     @delete-address="toggleDeleteChoice"  />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

import AddressItem from "@/entities/user-address/ui/AddressItem.vue";

const { toggleDeleteChoice } = baseDeleteModal();
const { userAddresses } = informationContactStore();
</script>

<style scoped>

</style>