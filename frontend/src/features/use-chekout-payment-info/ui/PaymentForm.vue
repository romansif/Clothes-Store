<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Name</label>
      <CheckoutInput v-model="paymentForm.cardName"
             :placeholder="'Card Name is optional'"
             variant="payment"
             :error="false" />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Number</label>
      <IMask v-model:value="paymentForm.cardNumber"
             :placeholder="cardNumberPlaceholder"
             :class="cardNumberClass"
             :mask="cardNumberMask.mask" />
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label class="text-sm">Expiry date</label>
      <IMask v-model:value="paymentForm.expiryDate"
             :placeholder="expiryDatePlaceholder"
             :class="expiryDateClass"
             :mask="expiryDateMask.mask" />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm">CVV</label>
      <IMask v-model:value="paymentForm.cardCvv"
             :placeholder="cardCvvPlaceholder"
             :class="cardCvvClass"
             :mask="cardCvvMask.mask"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { paymentClasses } from "@/shared/const/checkout/payment.classes.ts";
import { usePaymentFormInput } from "@/features/use-chekout-payment-info/lib/payment-input.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";
import { paymentForm } from "@/features/use-chekout-payment-info/model/payment.form.ts";
import CheckoutInput from "@/shared/ui/checkout/CheckoutInput.vue";

const { cardNumberMask, expiryDateMask, cardCvvMask } = paymentStore();
const { cardNumberClass, expiryDateClass, cardCvvClass } = paymentClasses();
const { cardNumberPlaceholder, expiryDatePlaceholder, cardCvvPlaceholder } = usePaymentFormInput();
</script>

<style scoped>

</style>