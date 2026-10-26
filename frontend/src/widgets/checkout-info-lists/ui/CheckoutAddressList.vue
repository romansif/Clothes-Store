<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-35 pb-4">
    <CheckoutAddressItem v-for="address in userAddresses"
                         :key="address.id"
                         :address="address"
                         @click="useSavedAddress(address)" />
  </ul>
</template>

<script setup lang="ts">
import { useAddAddress } from "@/features/checkout-contact-info/api/add-address";
import { informationContactStore } from "@/shared/model/address.store";
import { CheckoutAddressItem } from "@/entities/checkout-info-item";

const { useSavedAddress } = useAddAddress();
const { userAddresses } = informationContactStore();
</script>
