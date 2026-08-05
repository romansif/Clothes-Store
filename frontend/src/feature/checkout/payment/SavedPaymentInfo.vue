<script setup lang="ts">
import { onMounted } from "vue";
import { checkout } from "@/feature/checkout/composables/checkout.ts";
import { usePayment } from "@/feature/checkout/composables/use.payment.ts";

import SavedPaymentList from "@/feature/checkout/payment/saved-cards/SavedPaymentList.vue";

const { toggleShowPayment } = checkout();
const { getPayments } = usePayment();

onMounted(async () => {
  await getPayments();
})
</script>

<template>
  <div class="flex flex-col gap-5 mt-8 font-[Montserrat]">
    <div class="flex flex-col">
      <div class="flex justify-between">
        <h1 class="text-sm font-medium">PAYMENT CARDS</h1>
        <span @click="toggleShowPayment" class="text-xs text-indigo-500 cursor-pointer hover:text-violet-600">
          Hide saved payment
        </span>
      </div>
      <SavedPaymentList />
    </div>
  </div>
</template>

<style scoped>

</style>