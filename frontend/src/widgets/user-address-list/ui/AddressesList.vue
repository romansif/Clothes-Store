<template>
  <ul class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
    <AddressItem v-for="address in userAddresses"
                 :key="address.id"
                 :address="address"
                 @delete-address="toggleDeleteChoice"  />
  </ul>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { useSavedAddressesData } from "@/widgets/user-address-list/lib/use-saved-address-data";
import { AddressItem } from "@/entities/user-address";

const { userAddresses } = useSavedAddressesData()
const { toggleDeleteChoice } = baseDeleteModal();
</script>
