<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-35 pb-4">
    <CheckoutAddressItem v-for="address in userAddresses"
                         :key="address.id"
                         :address="address"
                         @click="useSavedAddress(address)" />
  </ul>
</template>

<script setup lang="ts">
import { useSavedAddress } from "@/features/checkout-contact-info/lib/use-saved-contact-info";
import { useSavedAddressesData } from "@/widgets/user-address-list/lib/use-saved-address-data";
import { CheckoutAddressItem } from "@/entities/checkout-info-item";

const { userAddresses } = useSavedAddressesData()
</script>
