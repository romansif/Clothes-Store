<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-50 pb-4">
    <CheckoutContactItem v-for="address in userAddresses" :address="address" />
  </ul>
</template>

<script setup lang="ts">
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

import CheckoutContactItem from "@/features/use-checkout-contact-info/ui/CheckoutContactItem.vue";

const { userAddresses } = informationContactStore();
</script>

<style scoped>

</style>