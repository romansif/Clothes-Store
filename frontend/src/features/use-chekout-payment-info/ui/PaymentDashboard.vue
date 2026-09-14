<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <div v-if="!isSavedPayment" >
      <PaymentMethods />
    </div>
    <SavedCheckoutPayment v-if="isSavedPayment"/>
    <div class="relative mt-5 sm:ml-auto transition duration-400 hover:scale-110">
      <BaseButton v-if="!isSavedPayment" @click="addPayment" name="Pay" variant="checkOut"/>
      <BaseButton v-if="isSavedPayment" @click="useSavedPayment" name="Pay" variant="checkOut"/>
      <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
          sm:left-60 md:left-75 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useAddPayment } from "@/features/use-chekout-payment-info/api/add-payment.ts";
import { togglePaymentForm } from "@/features/use-chekout-payment-info/lib/toggle.payment.ts";
import { paymentForm } from "@/features/use-chekout-payment-info/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-chekout-payment-info/model/payment.errors.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import PaymentMethods from "./PaymentMethods.vue";
import SavedCheckoutPayment from "@/features/use-chekout-payment-info/ui/SavedCheckoutPayment.vue";

const { isSavedPayment } = togglePaymentForm();
const { addPayment, useSavedPayment } = useAddPayment();

watch(() => [paymentForm.value.cardNumber, paymentForm.value.expiryDate, paymentForm.value.cardCvv, paymentForm.value.paymentMethod],
    ([cardNumber, expiryDate, cardCvv, paymentMethod]) => {
  if(cardNumber) {
    paymentFormErrors.value.cardNumber = false
    paymentFormErrors.value.paymentMethod = false
  }
  if(expiryDate) {
    paymentFormErrors.value.expiryDate = false
    paymentFormErrors.value.paymentMethod = false
  }
  if(cardCvv) {
    paymentFormErrors.value.cardCvv = false
    paymentFormErrors.value.paymentMethod = false
  }
  if(paymentMethod) {
    paymentFormErrors.value.paymentMethod = false
  }
})
</script>

<style scoped>

</style>