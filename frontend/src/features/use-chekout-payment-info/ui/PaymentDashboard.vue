<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <SavedCheckoutPayment v-if="isSavedPayment"/>
    <div v-else class="flex flex-col mt-8 gap-5">
      <div v-if="userPayments.length > 0" class="flex justify-between">
        <label class="font-medium text-xs md:text-sm">
          PAYMENT METHODS
        </label>
        <span @click="toggleShowPayment()"
              class="text-xs text-indigo-600 cursor-pointer hover:text-violet-600">
          Show saved payment
        </span>
      </div>
      <div class="flex gap-3">
        <form @submit.prevent="addPayment" action="" class="flex flex-col gap-4 w-full font-dm-sans">
          <PaymentMethods :user-payment="userPayment" :is-debit-card="isDebitCard" @open-card-form="openCardForm" />
          <div class="relative mt-5 sm:ml-auto transition duration-400 hover:scale-110">
            <BaseButton v-if="!isSavedPayment" type="submit" name="Pay" variant="checkOut"/>
            <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
                 sm:left-60 md:left-75 lg:left-34 xl:left-46">
          </div>
        </form>
      </div>
    </div>
    <div class="relative mt-5 sm:ml-auto transition duration-400 hover:scale-110">
      <BaseButton v-if="isSavedPayment" @click="useSavedPayment" name="Pay" variant="checkOut"/>
      <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
           sm:left-60 md:left-75 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddPayment } from "@/features/use-chekout-payment-info/api/add-payment.ts";
import { togglePaymentForm } from "@/features/use-chekout-payment-info/lib/toggle-payment.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment.form.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/base/BaseButton.vue";
import PaymentMethods from "@/entities/checkout-payment/ui/PaymentMethods.vue";
import SavedCheckoutPayment from "@/features/use-chekout-payment-info/ui/SavedCheckoutPayment.vue";

const { userPayments, userPayment } = paymentStore();
const { addPayment, useSavedPayment } = useAddPayment();
const { openCardForm, toggleShowPayment, isSavedPayment, isDebitCard } = togglePaymentForm();

refClearErrorsOnChange(
  paymentForm,
  paymentFormErrorMessage
)
</script>

<style scoped>

</style>