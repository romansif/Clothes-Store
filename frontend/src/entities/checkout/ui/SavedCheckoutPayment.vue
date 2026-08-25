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
const { getPayments } = paymentApi();
const { toggleShowPayment } = useCheckout();

import { onMounted } from "vue";
import { useCheckout } from "@/feature/use-checkout/model/use-checkout.ts";
import { paymentApi } from "@/feature/use-checkout/api/payment.api.ts";

import PaymentList from "@/entities/checkout/ui/PaymentList.vue";

onMounted(async () => {
  await getPayments();
})
</script>

<style scoped>

</style>