<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-35 pb-4">
    <AddressItem v-for="address in userAddresses" :address="address" />
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetAddress } from "@/features/use-user-address/api/get-address.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

import AddressItem from "@/features/use-checkout-contact-info/ui/AddressItem.vue";

const { getAddresses } = useGetAddress();
const { userAddresses } = informationContactStore();

onMounted(async () => {
  await getAddresses();
})
</script>

<style scoped>

</style>