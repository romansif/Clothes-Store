<template>
  <CheckoutInfo />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetAddress } from "@/features/use-checkout/api/address/get-address.ts";

import CheckoutInfo from "@/features/use-checkout/ui/CheckoutInfo.vue";

const { getAddresses } = useGetAddress();

onMounted(async () => {
  await getAddresses();
})
</script>

<style scoped>

</style>