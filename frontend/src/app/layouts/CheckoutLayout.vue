<template>
<router-view />
</template>

<script setup lang="ts">
const { getPayments } = paymentApi();
const { getAddresses, getAddress } = addressApi();

import { onMounted } from "vue";
import { paymentApi } from "@/features/use-checkout/api/payment.api.ts";
import { addressApi } from "@/features/use-checkout/api/address.api.ts";

onMounted(async () => {
  await getAddress();
  await getPayments();
  await getAddresses();
})
</script>

<style scoped>

</style>