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
          :class="cardCvvClass" :mask="cardCvv.mask"/>
    </div>
  </div>
</template>

<script setup lang="ts">

const { payment } = checkoutForms();
const { cardNumberMask, expiryDateMask, cardCvv } = usersStore();
const { carNameClass, cardNumberClass, expiryDateClass, cardCvvClass } = paymentClasses();
const { cardNumberPlaceholder, expiryDatePlaceholder, cardCvvPlaceholder } = checkoutPlaceholder();

import { IMaskComponent as IMask } from "vue-imask";
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { paymentClasses } from "@/shared/composables/style/checkout-style/payment.classes.ts";
import { checkoutPlaceholder } from "@/feature/checkout/checkout-actions/checkout.placeholder.ts";
</script>

<style scoped>

</style>