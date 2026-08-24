<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 w-full">
      <label>Card Name</label>
      <input v-model="payment.cardName" type="text" placeholder="Card Name is optional" :class="carNameClass()" />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label>Card Number</label>
      <IMask v-model:value="payment.cardNumber" type="text" :placeholder="cardNumberPlaceholder"
          :class="cardNumberClass" :mask="cardNumberMask.mask" />
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label>Expiry date</label>
      <IMask v-model.value="payment.expiryDate" type="text" inputmode="numeric" :placeholder="expiryDatePlaceholder"
          :class="expiryDateClass" :mask="expiryDateMask.mask" />
    </div>
    <div class="flex flex-col gap-2">
      <label>CVV</label>
      <IMask v-model.value="payment.cardCvv" type="text" inputmode="numeric" :placeholder="cardCvvPlaceholder"
          :class="cardCvvClass" :mask="cardCvvMask.mask"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const { payment } = checkoutForm();
const { cardNumberMask, expiryDateMask, cardCvvMask } = checkoutStore();
const { carNameClass, cardNumberClass, expiryDateClass, cardCvvClass } = paymentClasses();
const { cardNumberPlaceholder, expiryDatePlaceholder, cardCvvPlaceholder } = checkoutInput();

import { IMaskComponent as IMask } from "vue-imask";
import { checkoutStore } from "@/feature/checkout/model/checkout.store.ts";
import { checkoutForm } from "@/feature/checkout/model/checkout.form.ts";
import { paymentClasses } from "@/shared/constants/checkout/payment.classes.ts";
import { checkoutInput } from "@/feature/checkout/lib/checkout-input.ts";
</script>

<style scoped>

</style>