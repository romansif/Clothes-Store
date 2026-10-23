<template>
  <Transition name="view">
    <ul class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
      <AddressItem v-for="address in userAddresses"
                   :key="address.id"
                   :address="address"
                   @delete-address="toggleDeleteChoice"  />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal";
import { informationContactStore } from "@/shared/model/address.store";

import { AddressItem } from "@/entities/user-address";

const { toggleDeleteChoice } = baseDeleteModal();
const { userAddresses } = informationContactStore();
</script>
