<template>
  <PaymentCardForm v-if="isDebitCard"
                   :user-payment="userPayment" />
  <div v-if="!isDebitCard"
       :class="paymentMethodClass(paymentForm.paymentMethod,'card',
       paymentFormErrorMessage.paymentMethod)"
       @click="emit('openCardForm', paymentForm.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :variant="'card'"
                   @click="emit('openCardForm', paymentForm.paymentMethod)" />
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,'apple',
       paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :variant="'apple'"
                   @click="emit('openCardForm', paymentForm.paymentMethod)" />
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,'google',
       paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :variant="'google'"
                   @click="emit('openCardForm', paymentForm.paymentMethod)" />
  </div>
  <div :class="paymentMethodClass(paymentForm.paymentMethod,'paypal',
       paymentFormErrorMessage.paymentMethod)">
    <PaymentMethod v-model="paymentForm.paymentMethod"
                   :variant="'paypal'"
                   @click="emit('openCardForm', paymentForm.paymentMethod)" />
  </div>
  <span v-if="paymentFormErrorMessage.paymentMethod"
        class="text-red-600 text-xs">
    {{ paymentFormErrorMessage.paymentMethod }}
  </span>
</template>

<script setup lang="ts">
import { paymentMethodClass } from "@/shared/model/payment-form.variants.ts";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment-form.ts";
import type { UserPayment } from "@/entities/checkout-payment/model/payment.type.ts";

import PaymentCardForm from "./PaymentCardForm.vue";
import PaymentMethod from "@/entities/checkout-payment/ui/PaymentMethod.vue";

defineProps<{
  userPayment: UserPayment | null;
  isDebitCard: boolean;
}>();

const emit = defineEmits<{
  openCardForm: [method: string];
  closeCardForm: [method: string];
}>();
</script>
