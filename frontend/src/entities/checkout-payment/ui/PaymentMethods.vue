<template>
  <PaymentForm v-if="isDebitCard" :user-payment="userPayment" />
  <div v-if="!isDebitCard" @click="openCardForm('card')"
       :class="paymentMethodClass(paymentForm.paymentMethod,
       'card', paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :method="'card'"
                   :title="'DEBIT OR CREDIT CARD'"
                   :text="'Visa, Mastercard'" />
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
                   :text="'Fast payment with Apple'" />
    <img :src="apple_pay" alt="" class="w-15">
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,
       'google', paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :method="'google'"
                   :title="'GOOGLE PAY'"
                   :text="'Payment via Google account'" />
    <img :src="google_pay" alt="" class="w-15">
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,
       'paypal', paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :method="'paypal'"
                   :title="'PAYPAL'"
                   :text="'International wallet'" />
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
  openCardForm: [type: string];
}>();

const openCardForm = (type: string) => {
  emit("openCardForm", type);
};

import PaymentForm from "./PaymentForm.vue";
import visa_pay from '@/assets/icons/checkout/payment/visa.png';
import pay_pal from '@/assets/icons/checkout/payment/paypal.png';
import apple_pay from '@/assets/icons/checkout/payment/applepay.png';
import google_pay from '@/assets/icons/checkout/payment/googlepay.png';
import mastercard_pay from '@/assets/icons/checkout/payment/mastercard.svg';
import PaymentMethod from "@/shared/ui/checkout/PaymentMethod.vue";

const { paymentMethodClass } = paymentClasses();
</script>

<style scoped>

</style>