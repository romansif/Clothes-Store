<template>
  <ul class="flex flex-col overflow-y-auto no-scrollbar h-92.5 pb-4">
    <PaymentItem v-for="payment in paymentCards(userPayments)"
                 :key="payment.id"
                 :payment="payment"
                 @click="useSavedCard(payment)" />
  </ul>
</template>

<script setup lang="ts">
import { paymentCards } from "@/shared/lib/use-payment-card";
import { paymentStore } from "@/shared/model/payment.store";
import { useAddPayment } from "@/features/checkout-payment-dashboard/api/add-payment";
import { PaymentItem } from "@/entities/checkout-payment-item";

const { userPayments } = paymentStore();
const { useSavedCard } = useAddPayment()
</script>
