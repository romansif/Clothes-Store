<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Name</label>
      <input v-model="paymentForm.cardName" type="text" placeholder="Card Name is optional" :class="carNameClass()" />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm">Card Number</label>
      <IMask v-model:value="paymentForm.cardNumber" type="text" :placeholder="cardNumberPlaceholder"
          :class="cardNumberClass" :mask="cardNumberMask.mask" />
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label class="text-sm">Expiry date</label>
      <IMask v-model.value="paymentForm.expiryDate" type="text" inputmode="numeric" :placeholder="expiryDatePlaceholder"
          :class="expiryDateClass" :mask="expiryDateMask.mask" />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm">CVV</label>
      <IMask v-model.value="paymentForm.cardCvv" type="text" inputmode="numeric" :placeholder="cardCvvPlaceholder"
          :class="cardCvvClass" :mask="cardCvvMask.mask"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { paymentClasses } from "@/shared/const/checkout/payment.classes.ts";
import { usePaymentFormInput } from "@/features/use-chekout-payment-info/lib/payment-input.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";
import { paymentForm } from "@/features/use-chekout-payment-info/model/payment.form.ts";

const { cardNumberMask, expiryDateMask, cardCvvMask } = paymentStore();
const { carNameClass, cardNumberClass, expiryDateClass, cardCvvClass } = paymentClasses();
const { cardNumberPlaceholder, expiryDatePlaceholder, cardCvvPlaceholder } = usePaymentFormInput();
</script>

<style scoped>

</style>