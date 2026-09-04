<template>
<router-view />
</template>

<script setup lang="ts">
const { loading } = useBaseModals();
const { getPayments } = useGetPayment();
const { getAddresses, getAddress } = useGetAddress();

import { onMounted } from "vue";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useGetPayment } from "@/features/use-checkout/api/payment/get-payment.ts";
import { useGetAddress } from "@/features/use-checkout/api/address/get-address.ts";

onMounted(async () => {
  loading.value = true;

  await getAddress();
  await getPayments();
  await getAddresses();

  loading.value = false;
})
</script>

<style scoped>

</style>