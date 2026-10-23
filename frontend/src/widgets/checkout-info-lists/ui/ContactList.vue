<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-50 pb-4">
    <CheckoutInfoItem v-for="address in userAddresses"
                      :key="address.id"
                      :address="address"
                      @click="useSavedContactInfo(address)" />
  </ul>
</template>

<script setup lang="ts">
import { useAddAddress } from "@/features/checkout-contact-info/api/add-address";
import { informationContactStore } from "@/shared/model/address.store";
import { CheckoutInfoItem } from "@/entities/checkout-info-item";

const { useSavedContactInfo } = useAddAddress()
const { userAddresses } = informationContactStore();
</script>
