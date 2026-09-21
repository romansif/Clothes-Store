<template>
  <div class="flex items-center gap-3">
    <input @click="closeCardForm(method)"
           v-model="paymentForm.paymentMethod"
           type="radio"
           :value="method"
           name="shipping-method"
           class="accent-black w-4 h-4" />
    <div class="flex flex-col">
      <span class="font-semibold">
        {{ title }}
      </span>
      <span class="text-xs text-gray-500">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { togglePaymentForm } from "@/features/use-chekout-payment-info/lib/toggle-payment.ts";
import { paymentForm } from "@/entities/checkout-payment/model/payment.form.ts";

defineProps<{
  method: string;
  title: string;
  text: string;
}>();

const { closeCardForm } = togglePaymentForm();
</script>

<style scoped>

</style>