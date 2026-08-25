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

const { userPayments } = checkoutStore();
const { useSavedCard } = paymentApi();
const { savedPaymentClass } = paymentClasses();

import { checkoutStore } from "@/entities/checkout/checkout.store.ts";
import { paymentClasses } from "@/shared/constants/checkout/payment.classes.ts";
import { paymentApi } from "@/feature/checkout/api/payment.api.ts";
</script>

<style scoped>

</style>