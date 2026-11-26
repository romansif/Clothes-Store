<template>
  <TransitionGroup name="list" tag="ul" class="no-scrollbar flex h-50 flex-col overflow-y-auto pb-4">
    <CheckoutInfoItem
      v-for="address in userAddresses"
      :key="address.id"
      :address="address"
      @click="useSavedContactInfo(address)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useSavedContactInfo } from "@/features/checkout-contact-info";
import { useSavedAddressesData } from "@/widgets/user-address-list";
import { CheckoutInfoItem } from "@/entities/checkout-info-item";

const { userAddresses } = useSavedAddressesData();
</script>
