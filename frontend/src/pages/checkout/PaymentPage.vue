<template>
  <PaymentDashboard />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetPayment } from "@/features/use-user-payment/api/get-payment.ts";

import PaymentDashboard from "@/features/use-chekout-payment-info/ui/PaymentDashboard.vue";

const { getPayments } = useGetPayment();

onMounted(async () => {
  await getPayments();
})
</script>

<style scoped>

</style>