<template>
<router-view />
</template>

<script setup lang="ts">
const { getPayments } = useGetPayment();
const { getAddresses, getAddress } = useGetAddress();

import { onMounted } from "vue";
import { useGetPayment } from "@/features/use-checkout/api/payment/get-payment.ts";
import { useGetAddress } from "@/features/use-checkout/api/address/get-address.ts";

onMounted(async () => {
  await getAddress();
  await getPayments();
  await getAddresses();
})
</script>

<style scoped>

</style>