<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-50 pb-4">
    <ContactItem v-for="address in userAddresses" :address="address" />
  </ul>
</template>

<script setup lang="ts">
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

import ContactItem from "@/features/use-checkout-contact-info/ui/ContactItem.vue";

const { userAddresses } = informationContactStore();
</script>

<style scoped>

</style>