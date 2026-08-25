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

<script setup lang="ts">
const { isSavedPayment } = useCheckout();
const { payment } = checkoutForm();
const { paymentErrors } = checkoutErrors();
const { addPayment, useSavedPayment } = paymentApi();

import { watch } from "vue";
import { paymentApi } from "@/feature/use-checkout/api/payment.api.ts";
import { checkoutForm } from "@/feature/use-checkout/model/checkout.form.ts";
import { checkoutErrors } from "@/feature/use-checkout/lib/checkout.errors.ts";
import { useCheckout } from "@/feature/use-checkout/model/use-checkout.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import PaymentMethods from "./PaymentMethods.vue";
import SavedCheckoutPayment from "@/entities/checkout/ui/SavedCheckoutPayment.vue";

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

<style scoped>

</style>