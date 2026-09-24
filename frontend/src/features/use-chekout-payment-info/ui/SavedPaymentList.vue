<template>
  <ul class="flex-col overflow-y-auto no-scrollbar h-92.5 pb-4">
    <PaymentItem v-for="payment in userPayments"
                 :payment="payment" />
  </ul>
</template>

<script setup lang="ts">
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";

import PaymentItem from "@/features/use-chekout-payment-info/ui/PaymentItem.vue";

const { userPayments } = paymentStore();
</script>

<style scoped>

</style>