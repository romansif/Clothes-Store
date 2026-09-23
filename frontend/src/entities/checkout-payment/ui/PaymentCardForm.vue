<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Name</label>
      <CheckoutInput v-model="paymentForm.cardName"
             :placeholder="'Card Name is optional'"
             variant="payment"
             :error-message="''" />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Number</label>
      <IMask v-model:value="paymentForm.cardNumber"
             placeholder="XXXX-XXXX-XXXX-XXXX"
             :class="cardNumberClass(paymentFormErrorMessage.cardNumber)"
             :mask="cardNumberMask.mask" />
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label class="text-sm">Expiry date</label>
      <IMask v-model:value="paymentForm.expiryDate"
             placeholder="MM / YY"
             :class="expiryDateClass(paymentFormErrorMessage.expiryDate)"
             :mask="expiryDateMask.mask" />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm">CVV</label>
      <IMask v-model:value="paymentForm.cardCvv"
             placeholder="•••"
             :class="cardCvvClass(paymentFormErrorMessage.cardCvv)"
             :mask="cardCvvMask.mask"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { paymentClasses } from "@/shared/const/checkout/payment.classes.ts";
import { cardNumberMask, expiryDateMask, cardCvvMask } from "@/entities/checkout-payment/model/payment.mask.ts";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment.form.ts";
import type {UserPayment} from "@/entities/checkout-payment/model/payment.type.ts";

defineProps<{
  userPayment: UserPayment | null;
}>();

import CheckoutInput from "@/shared/ui/checkout/CheckoutInput.vue";

const { cardNumberClass, expiryDateClass, cardCvvClass } = paymentClasses();
</script>

<style scoped>

</style>