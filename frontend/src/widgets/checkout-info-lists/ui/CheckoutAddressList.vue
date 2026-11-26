<template>
  <TransitionGroup name="list" tag="ul" class="no-scrollbar flex h-35 flex-col overflow-y-auto pb-4">
    <CheckoutAddressItem
      v-for="address in userAddresses"
      :key="address.id"
      :address="address"
      @click="useSavedAddress(address)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useSavedAddress } from "@/features/checkout-contact-info";
import { useSavedAddressesData } from "@/widgets/user-address-list";
import { CheckoutAddressItem } from "@/entities/checkout-info-item";

const { userAddresses } = useSavedAddressesData();
</script>
