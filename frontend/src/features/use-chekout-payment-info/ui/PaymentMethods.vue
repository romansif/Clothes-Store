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
      <form @keydown.enter="addPayment" action="" class="flex flex-col gap-4 w-full font-dm-sans">
        <PaymentForm v-if="isDebitCard" />
        <div v-if="!isDebitCard" @click="openCardForm('card')"
             :class="paymentMethodClass('card')">
          <div class="flex items-center gap-3">
            <input v-model="paymentForm.paymentMethod"
                   type="radio"
                   placeholder="Email"
                   value="card"
                   name="shipping-method"
                   class="accent-black w-4 h-4" />
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
            <input @click="closeCardForm('apple')"
                   v-model="paymentForm.paymentMethod"
                   type="radio"
                   placeholder="Email"
                   value="apple"
                   name="shipping-method"
                   class="accent-black w-4 h-4" />
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
            <input @click="closeCardForm('google')"
                   v-model="paymentForm.paymentMethod"
                   type="radio"
                   placeholder="Email"
                   value="google"
                   name="shipping-method"
                   class="accent-black w-4 h-4" />
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
            <input @click="closeCardForm('paypal')"
                   v-model="paymentForm.paymentMethod"
                   type="radio"
                   placeholder="Email"
                   value="paypal"
                   name="shipping-method"
                   class="accent-black w-4 h-4" />
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
        <span v-if="paymentFormErrors.paymentMethod" class="text-red-600 text-xs">
          {{ paymentFormErrorMessage.paymentMethod }}
        </span>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddPayment } from "@/features/use-chekout-payment-info/api/add-payment.ts";
import { paymentClasses } from "@/shared/const/checkout/payment.classes.ts";
import { togglePaymentForm } from "@/features/use-chekout-payment-info/lib/toggle.payment.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";
import { paymentForm, paymentFormErrorMessage} from "@/features/use-chekout-payment-info/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-chekout-payment-info/model/payment.errors.ts";

import PaymentForm from "./PaymentForm.vue";
import visa_pay from '@/assets/icons/checkout/payment/visa.png';
import pay_pal from '@/assets/icons/checkout/payment/paypal.png';
import apple_pay from '@/assets/icons/checkout/payment/applepay.png';
import google_pay from '@/assets/icons/checkout/payment/googlepay.png';
import mastercard_pay from '@/assets/icons/checkout/payment/mastercard.svg';

const { addPayment } = useAddPayment();
const { userPayments } = paymentStore();
const { paymentMethodClass } = paymentClasses();
const { openCardForm, closeCardForm, toggleShowPayment, isDebitCard } = togglePaymentForm();
</script>

<style scoped>

</style>