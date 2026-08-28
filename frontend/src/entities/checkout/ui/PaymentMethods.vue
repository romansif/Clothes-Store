<template>
  <div class="flex flex-col mt-8 gap-5">
    <div class="flex justify-between">
      <label class="font-medium text-xs md:text-sm">
        PAYMENT METHODS
      </label>
      <span v-if="userPayments.length > 0" @click="toggleShowPayment()"
            class="text-xs text-indigo-600 cursor-pointer hover:text-violet-600">
        Show saved payment
      </span>
    </div>
    <div class="flex gap-3">
      <form @keydown.enter="addPayment" action="" class="flex flex-col gap-6 w-full">
          <PaymentForm v-if="isDebitCard" />
        <div v-if="!isDebitCard" @click="openCardForm('card')"
             :class="paymentMethodClass('card')">
          <div class="flex items-center gap-3">
            <input v-model="payment.paymentMethod" type="radio" value="card" name="shipping-method"
                class="accent-black w-4 h-4" placeholder="Email">
            <div class="flex flex-col">
              <span class="font-semibold">
                DEBIT OR CREDIT CARD
              </span>
              <span class="text-xs text-gray-500">
                Visa, Mastercard
              </span>
            </div>
          </div>
          <div class="flex gap-5">
            <img :src="visa_pay" alt="" class="w-15">
            <img :src="mastercard_pay" alt="" class="w-11.25">
          </div>
        </div>
        <div :class="paymentMethodClass('apple')">
          <div class="flex items-center gap-3">
            <input @click="closeCardForm('apple')" v-model="payment.paymentMethod" type="radio" placeholder="Email"
                   value="apple" class="accent-black w-4 h-4" name="shipping-method">
            <div class="flex flex-col">
              <span class="font-semibold">
                APPLE PAY
              </span>
              <span class="text-xs text-gray-500">
                Fast payment with Apple
              </span>
            </div>
          </div>
          <img :src="apple_pay" alt="" class="w-15">
        </div>
        <div :class="paymentMethodClass('google')">
          <div class="flex items-center gap-3">
            <input @click="closeCardForm('google')" v-model="payment.paymentMethod" type="radio" placeholder="Email"
                   value="google" class="accent-black w-4 h-4" name="shipping-method">
            <div class="flex flex-col">
              <span class="font-semibold">
                GOOGLE PAY
              </span>
              <span class="text-xs text-gray-500">
                Payment via Google account
              </span>
            </div>
          </div>
          <img :src="google_pay" alt="" class="w-15">
        </div>
        <div :class="paymentMethodClass('paypal')">
          <div class="flex items-center gap-3">
            <input @click="closeCardForm('paypal')" v-model="payment.paymentMethod" type="radio" placeholder="Email"
                   value="paypal" class="accent-black w-4 h-4" name="shipping-method">
            <div class="flex flex-col">
              <span class="font-semibold">
                PAYPAL
              </span>
              <span class="text-xs text-gray-500">
                International wallet
              </span>
            </div>
          </div>
          <img :src="pay_pal" alt="" class="w-22.5">
        </div>
        <span v-if="paymentErrors.paymentMethodError" class="text-red-600 text-xs">
          {{ paymentMessages.paymentMethodMessage }}
        </span>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userPayments } = checkoutStore();
const { addPayment } = paymentApi();
const { paymentMethodClass } = paymentClasses();
const { paymentErrors } = checkoutErrors();
const { payment, paymentMessages } = checkoutForm();
const { openCardForm, closeCardForm, toggleShowPayment, isDebitCard } = useCheckout();

import { useCheckout } from "@/features/use-checkout/model/use-checkout.ts";
import { paymentApi } from "@/features/use-checkout/api/payment.api.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import { paymentClasses } from "@/shared/const/checkout/payment.classes.ts";
import { checkoutErrors }from "@/features/use-checkout/lib/checkout.errors.ts";

import PaymentForm from "./PaymentForm.vue";
import visa_pay from '@/assets/icons/checkout/payment/visa.png';
import pay_pal from '@/assets/icons/checkout/payment/paypal.png';
import apple_pay from '@/assets/icons/checkout/payment/applepay.png';
import google_pay from '@/assets/icons/checkout/payment/googlepay.png';
import mastercard_pay from '@/assets/icons/checkout/payment/mastercard.svg';
</script>

<style scoped>

</style>