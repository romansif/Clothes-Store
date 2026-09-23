<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-35 pb-4">
    <CheckoutAddressItem v-for="address in userAddresses" :address="address" />
  </ul>
</template>

<script setup lang="ts">
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

import CheckoutAddressItem from "@/features/use-checkout-contact-info/ui/CheckoutAddressItem.vue";

const { userAddresses } = informationContactStore();
</script>

<style scoped>

</style>