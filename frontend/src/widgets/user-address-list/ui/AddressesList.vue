<template>
  <TransitionGroup name="list" tag="ul" class="no-scrollbar grid h-92.5 grid-cols-2 overflow-y-auto pb-4">
    <AddressItem
      v-for="address in userAddresses"
      :key="address.id"
      :address="address"
      @delete-address="toggleDeleteChoice"
      @update-address="openEditAddress"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete";
import { openEditAddress } from "@/features/edit-saved-address";
import { useSavedAddressesData } from "@/widgets/user-address-list";
import { AddressItem } from "@/entities/user-address";

const { userAddresses } = useSavedAddressesData();
const { toggleDeleteChoice } = baseDeleteModal();
</script>
