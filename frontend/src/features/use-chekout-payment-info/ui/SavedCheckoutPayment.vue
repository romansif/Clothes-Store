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
      <SavedPaymentList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetPayment } from "@/features/use-user-payment/api/get-payment.ts";
import { togglePaymentForm } from "@/features/use-chekout-payment-info/lib/toggle-payment.ts";

import SavedPaymentList from "@/features/use-chekout-payment-info/ui/SavedPaymentList.vue";

const { getPayments } = useGetPayment();
const { toggleShowPayment } = togglePaymentForm();

onMounted(async () => {
  await getPayments();
})
</script>

<style scoped>

</style>