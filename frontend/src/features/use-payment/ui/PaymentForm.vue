<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Name</label>
      <input v-model="payment.cardName" type="text" placeholder="Card Name is optional" :class="carNameClass()" />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Number</label>
      <IMask v-model:value="payment.cardNumber" type="text" :placeholder="cardNumberPlaceholder"
          :class="cardNumberClass" :mask="cardNumberMask.mask" />
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label class="text-sm">Expiry date</label>
      <IMask v-model.value="payment.expiryDate" type="text" inputmode="numeric" :placeholder="expiryDatePlaceholder"
          :class="expiryDateClass" :mask="expiryDateMask.mask" />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm">CVV</label>
      <IMask v-model.value="payment.cardCvv" type="text" inputmode="numeric" :placeholder="cardCvvPlaceholder"
          :class="cardCvvClass" :mask="cardCvvMask.mask"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { checkoutStore } from "@/features/use-checkout/model/checkout.store.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { paymentClasses } from "@/shared/const/checkout/payment.classes.ts";
import { usePaymentFormInput } from "@/features/use-payment/lib/payment-input.ts";

const { payment } = checkoutForm();
const { cardNumberMask, expiryDateMask, cardCvvMask } = checkoutStore();
const { carNameClass, cardNumberClass, expiryDateClass, cardCvvClass } = paymentClasses();
const { cardNumberPlaceholder, expiryDatePlaceholder, cardCvvPlaceholder } = usePaymentFormInput();
</script>

<style scoped>

</style>