<template>
  <PaymentDashboard />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetPayment } from "@/features/use-payment/api/get-payment.ts";

import PaymentDashboard from "@/features/use-payment/ui/PaymentDashboard.vue";

const { getPayments } = useGetPayment();

onMounted(async () => {
  await getPayments();
})
</script>

<style scoped>

</style>