<script setup lang="ts">
import { checkout } from "@/feature/checkout/composables/checkout.ts";
import { usePayment } from "@/feature/checkout/composables/use.payment.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { checkoutErrors }from "@/shared/composables/errors/errors-messages/checkout.errors";

import PaymentForm from "./PaymentForm.vue";
import visa_pay from '@/app/assets/icons/payment/visa.png';
import pay_pal from '@/app/assets/icons/payment/paypal.png';
import apple_pay from '@/app/assets/icons/payment/applepay.png';
import google_pay from '@/app/assets/icons/payment/googlepay.png';
import mastercard_pay from '@/app/assets/icons/payment/mastercard.svg';

const { addPayment } = usePayment();
const { paymentErrors } = checkoutErrors();
const { payment, paymentMessages } = checkoutForms();
const { openCardForm, closeCardForm, isDebitCard } = checkout();
</script>

<template>
  <div class="flex flex-col mt-8 gap-5">
    <label class="font-medium text-xs md:text-sm">PAYMENT METHODS</label>
    <div class="flex gap-3">
      <form @keydown.enter="addPayment" action="" class="flex flex-col gap-6 w-full">
        <form v-if="isDebitCard === true" action="" class="flex flex-col gap-3 w-full">
          <PaymentForm />
        </form>
        <div v-if="isDebitCard === false" @click="openCardForm('card')"
             :class="[`flex justify-between items-center px-3 border border-gray-300 rounded-xl h-[80px] transition
                duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`, paymentErrors.paymentMethodError ? 'border-red-400' : '']">
          <div class="flex items-center gap-3">
            <input v-model="payment.paymentMethod" type="radio" name="shipping-method"
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
            <img :src="visa_pay" alt="" class="w-[60px]">
            <img :src="mastercard_pay" alt="" class="w-[45px]">
          </div>
        </div>
        <div :class="[`flex justify-between items-center px-3 border border-gray-300 rounded-xl h-[80px] transition
                duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`, paymentErrors.paymentMethodError ? 'border-red-400' : '']">
          <div class="flex items-center gap-3">
            <input @click="closeCardForm('apple')" v-model="payment.paymentMethod" type="radio" value="apple" name="shipping-method"
                class="accent-black w-4 h-4" placeholder="Email">
            <div class="flex flex-col">
              <span class="font-semibold">
                APPLE PAY
              </span>
              <span class="text-xs text-gray-500">
                Fast payment with Apple
              </span>
            </div>
          </div>
          <img :src="apple_pay" alt="" class="w-[60px]">
        </div>
        <div :class="[`flex justify-between items-center px-3 border border-gray-300 rounded-xl h-[80px] transition
                duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`, paymentErrors.paymentMethodError ? 'border-red-400' : '']">
          <div class="flex items-center gap-3">
            <input @click="closeCardForm('google')" v-model="payment.paymentMethod" type="radio" value="google" name="shipping-method"
                class="accent-black w-4 h-4" placeholder="Email">
            <div class="flex flex-col">
              <span class="font-semibold">
                GOOGLE PAY
              </span>
              <span class="text-xs text-gray-500">
                Payment via Google account
              </span>
            </div>
          </div>
          <img :src="google_pay" alt="" class="w-[60px]">
        </div>
        <div :class="[`flex justify-between items-center px-3 border border-gray-300 rounded-xl h-[80px] transition
                duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`, paymentErrors.paymentMethodError ? 'border-red-400' : '']">
          <div class="flex items-center gap-3">
            <input @click="closeCardForm('paypal')" v-model="payment.paymentMethod" type="radio" value="paypal" name="shipping-method"
                class="accent-black w-4 h-4" placeholder="Email">
            <div class="flex flex-col">
              <span class="font-semibold">
                PAYPAL
              </span>
              <span class="text-xs text-gray-500">
                International wallet
              </span>
            </div>
          </div>
          <img :src="pay_pal" alt="" class="w-[90px]">
        </div>
        <span v-if="paymentErrors.paymentMethodError" class="text-red-600 text-xs">
          {{ paymentMessages.paymentMethodMessage }}
        </span>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>