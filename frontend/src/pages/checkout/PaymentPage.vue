<template>
  <PaymentDashboard />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetPayment } from "@/features/use-checkout/api/payment/get-payment.ts";

import PaymentDashboard from "@/features/use-checkout/ui/PaymentDashboard.vue";

const { getPayments } = useGetPayment();

onMounted(async () => {
  await getPayments();
})
</script>

<style scoped>

</style>