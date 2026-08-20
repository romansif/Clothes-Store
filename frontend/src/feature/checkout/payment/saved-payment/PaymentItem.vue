<template>
  <TransitionGroup name="list">
    <li @click="useSavedCard(checkout)" v-for="checkout in userPayments" :key="checkout.id" :class="savedPaymentClass">
      <div class="flex flex-col gap-5">
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Expiry Date: <span class="font-normal">{{ checkout.expiryDate }},</span>
          </span>
          <span class="text-sm font-semibold">
            CVV: <span class="font-normal">{{ checkout.cardCvv }}</span>
          </span>
        </div>
        <div class="flex gap-5">
          <span v-if="checkout.cardName" class="text-sm font-semibold">
            Card Name: <span class="font-normal">{{ checkout.cardName }}</span>
          </span>
          <span class="text-sm font-semibold">
            Card Number: <span class="font-normal">{{ checkout.cardNumber }}</span>
          </span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { userPayments } = usersStore();
const { useSavedCard } = usePayment();
const { savedPaymentClass } = paymentClasses();

import { usersStore } from "@/shared/composables/stores/users.store";
import { paymentClasses } from "@/shared/composables/style/checkout-style/payment.classes.ts";
import { usePayment } from "@/feature/checkout/checkout-actions/use.payment.ts";
</script>

<style scoped>

</style>