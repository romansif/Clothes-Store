<template>
  <PaymentCardForm v-if="props.isDebitCard" />
  <PaymentMethod
    v-for="payment in visibleMethods"
    :key="payment.method"
    v-model="paymentForm.paymentMethod"
    :payment="payment"
    :error="paymentFormErrorMessage.paymentMethod"
    @select="onSelect"
  />
  <span v-if="paymentFormErrorMessage.paymentMethod" class="text-xs text-red-600">
    {{ paymentFormErrorMessage.paymentMethod }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PaymentCardForm, PaymentMethod } from "@/entities/checkout-payment-form";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment-form/model/payment-form";
import { allPaymentMethods } from "@/entities/checkout-payment-form/model/payment-methods";
import type { PaymentMethods } from "@/entities/checkout-payment-form";

const props = defineProps<{
  isDebitCard: boolean;
}>();

const emit = defineEmits<{
  openCardForm: [method: PaymentMethods];
  closeCardForm: [method: PaymentMethods];
}>();

const visibleMethods = computed(() => allPaymentMethods.filter((p) => !(p.method === "card" && props.isDebitCard)));

const onSelect = (method: PaymentMethods) => {
  if (method === "card") emit("openCardForm", method);
  else emit("closeCardForm", method);
};
</script>
