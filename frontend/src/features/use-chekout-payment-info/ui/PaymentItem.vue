<template>
  <TransitionGroup name="list">
    <li @click="useSavedCard(payment)" :key="payment.id"
        :class="getSavedInfoClass(isChosenPayment)">
      <div class="flex flex-col gap-5">
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Expiry Date: <span class="font-normal font-dm-sans">{{ payment.expiryDate }},</span>
          </span>
          <span class="text-sm font-semibold">
            CVV: <span class="font-normal font-dm-sans">{{ payment.cardCvv }}</span>
          </span>
        </div>
        <div class="flex gap-5">
          <span v-if="payment.cardName"
                class="text-sm font-semibold">
            Card Name: <span class="font-normal font-dm-sans">{{ payment.cardName }}</span>
          </span>
          <span class="text-sm font-semibold">
            Card Number: <span class="font-normal">{{ payment.cardNumber }}</span>
          </span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useAddPayment } from "@/features/use-chekout-payment-info/api/add-payment.ts";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";
import { togglePaymentForm } from "@/features/use-chekout-payment-info/lib/toggle-payment.ts";
import type {UserPayment} from "@/entities/checkout-payment/model/payment.type.ts";

defineProps<{
  payment: UserPayment
}>();

const { useSavedCard } = useAddPayment();
const { isChosenPayment } = togglePaymentForm();
const { getSavedInfoClass } = checkoutClasses();
</script>

<style scoped>

</style>