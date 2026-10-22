<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-92.5 pb-4">
    <PaymentItem v-for="payment in paymentCards(userPayments)"
                 :payment="payment" />
  </ul>
</template>

<script setup lang="ts">
import { paymentCards } from "@/shared/lib/use-payment-card";
import { paymentStore } from "@/features/use-user-payment/model/payment.store";
import { PaymentItem } from "@/features/use-chekout-payment-info";

const { userPayments } = paymentStore();
</script>
