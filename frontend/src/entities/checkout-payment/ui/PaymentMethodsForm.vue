<template>
  <PaymentCardForm v-if="isDebitCard" :user-payment="userPayment" />
  <div v-if="!isDebitCard" @click="openCardForm('card')"
       :class="paymentMethodClass(paymentForm.paymentMethod,
       'card', paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :method="'card'"
                   :title="'DEBIT OR CREDIT CARD'"
                   :text="'Visa, Mastercard'"
                   @close-card-form="closeCardForm" />
    <div class="flex gap-5">
      <img :src="visa_pay" alt="" class="w-15">
      <img :src="mastercard_pay" alt="" class="w-11.25">
    </div>
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,
       'apple', paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :method="'apple'"
                   :title="'APPLE PAY'"
                   :text="'Fast payment with Apple'"
                   @close-card-form="closeCardForm" />
    <img :src="apple_pay" alt="" class="w-15">
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,
       'google', paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :method="'google'"
                   :title="'GOOGLE PAY'"
                   :text="'Payment via Google account'"
                   @close-card-form="closeCardForm" />
    <img :src="google_pay" alt="" class="w-15">
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,
       'paypal', paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :method="'paypal'"
                   :title="'PAYPAL'"
                   :text="'International wallet'"
                   @close-card-form="closeCardForm" />
    <img :src="pay_pal" alt="" class="w-22.5">
  </div>
  <span v-if="paymentFormErrorMessage.paymentMethod" class="text-red-600 text-xs">
    {{ paymentFormErrorMessage.paymentMethod }}
  </span>
</template>

<script setup lang="ts">
import { paymentClasses } from "@/shared/const/checkout/payment.classes.ts";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment.form.ts";
import type {UserPayment} from "@/entities/checkout-payment/model/payment.type.ts";

defineProps<{
  userPayment: UserPayment | null;
  isDebitCard: boolean;
}>();

const emit = defineEmits<{
  openCardForm: [method: string];
  closeCardForm: [method: string];
}>();

const openCardForm = (method: string) => {
  emit("openCardForm", method);
};

const closeCardForm = (method: string) => {
  emit("closeCardForm", method);
}

import PaymentCardForm from "./PaymentCardForm.vue";
import visa_pay from '@/assets/icons/checkout/payment/visa.png';
import pay_pal from '@/assets/icons/checkout/payment/paypal.png';
import apple_pay from '@/assets/icons/checkout/payment/applepay.png';
import google_pay from '@/assets/icons/checkout/payment/googlepay.png';
import mastercard_pay from '@/assets/icons/checkout/payment/mastercard.svg';
import PaymentMethod from "@/entities/checkout-payment/ui/PaymentMethod.vue";

const { paymentMethodClass } = paymentClasses();
</script>

<style scoped>

</style>