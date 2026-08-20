<template>
  <div class="flex flex-col gap-5 mt-8 font-[Montserrat]">
    <div class="flex flex-col">
      <div class="flex justify-between">
        <h1 class="text-sm font-medium">
          PAYMENT CARDS
        </h1>
        <span @click="toggleShowPayment"
              class="text-xs text-indigo-500 cursor-pointer hover:text-violet-600">
          Hide saved payment
        </span>
      </div>
      <PaymentList />
    </div>
  </div>
</template>

<script setup lang="ts">
const { getPayments } = usePayment();
const { toggleShowPayment } = checkout();

import { onMounted } from "vue";
import { checkout } from "@/feature/checkout/checkout-actions/checkout.ts";
import { usePayment } from "@/feature/checkout/checkout-actions/use.payment.ts";

import PaymentList from "@/feature/checkout/payment/saved-payment/PaymentList.vue";

onMounted(async () => {
  await getPayments();
})
</script>

<style scoped>

</style>