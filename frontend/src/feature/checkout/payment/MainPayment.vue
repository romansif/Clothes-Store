<script setup lang="ts">
import { watch } from "vue";
import { usePayment } from "@/feature/checkout/composables/use.payment.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { checkoutErrors } from "@/shared/composables/errors/errors-messages/checkout.errors";

import arrow from "@/app/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import PaymentMethods from "./payment-items/PaymentMethods.vue";

const { payment } = checkoutForms();
const { addPayment } = usePayment();
const { paymentErrors } = checkoutErrors();

watch(() => [payment.value.cardNumber, payment.value.expiryDate, payment.value.cardCvv, payment.value.paymentMethod],
    ([cardNumber, expiryDate, cardCvv, paymentMethod]) => {
  if(cardNumber) {
    paymentErrors.value.cardNumberError = false
    paymentErrors.value.paymentMethodError = false
  }
  if(expiryDate) {
    paymentErrors.value.expiryDateError = false
    paymentErrors.value.paymentMethodError = false
  }
  if(cardCvv) {
    paymentErrors.value.cardCvvError = false
    paymentErrors.value.paymentMethodError = false
  }
  if(paymentMethod) {
    paymentErrors.value.paymentMethodError = false
  }
})
</script>

<template>
  <div class="flex flex-col lg:w-[400px] xl:w-[500px]">
    <PaymentMethods />
    <div class="relative mt-5 sm:ml-auto">
      <BaseButton @click="addPayment" name="Pay" variant="checkOut"/>
      <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
          sm:left-60 md:left-75 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<style scoped>

</style>