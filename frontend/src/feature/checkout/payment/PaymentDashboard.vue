<script setup lang="ts">
import { watch } from "vue";
import { usePayment } from "@/feature/checkout/checkout-actions/use.payment.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { checkoutErrors } from "@/shared/composables/errors/errors-messages/checkout.errors";
import { checkout } from "@/feature/checkout/checkout-actions/checkout.ts";

import arrow from "@/app/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import PaymentMethods from "./payment-items/PaymentMethods.vue";
import SavedCheckoutPayment from "@/feature/checkout/payment/SavedCheckoutPayment.vue";

const { isSavedPayment } = checkout();
const { payment } = checkoutForms();
const { paymentErrors } = checkoutErrors();
const { addPayment, useSavedPayment } = usePayment();

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
  <div class="flex flex-col lg:w-100 xl:w-125">
    <div v-if="!isSavedPayment" >
      <PaymentMethods />
    </div>
    <SavedCheckoutPayment v-if="isSavedPayment"/>
    <div class="relative mt-5 sm:ml-auto transition duration-400 hover:scale-110">
      <BaseButton v-if="!isSavedPayment" @click="addPayment" name="Pay" variant="checkOut"/>
      <BaseButton v-if="isSavedPayment" @click="useSavedPayment" name="Shipping" variant="checkOut"/>
      <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
          sm:left-60 md:left-75 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<style scoped>

</style>