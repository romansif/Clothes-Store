<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-50 pb-4">
    <CheckoutInfoItem v-for="address in userAddresses"
                      :key="address.id"
                      :address="address"
                      @click="useSavedContactInfo(address)" />
  </ul>
</template>

<script setup lang="ts">
import { useSavedContactInfo } from "@/features/checkout-contact-info/lib/use-saved-contact-info";
import { useSavedAddressesData } from "@/widgets/user-address-list/lib/use-saved-address-data";
import { CheckoutInfoItem } from "@/entities/checkout-info-item";

const { userAddresses } = useSavedAddressesData()
</script>
