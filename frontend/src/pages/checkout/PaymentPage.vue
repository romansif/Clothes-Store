<template>
  <PaymentDashboard />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetPayment } from "@/features/saved-payment-card/api/get-payment";

import { PaymentDashboard } from "@/features/checkout-payment-dashboard";

const { getPayments } = useGetPayment();

onMounted(async () => {
  await getPayments();
})
</script>
