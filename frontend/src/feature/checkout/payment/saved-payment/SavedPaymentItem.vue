<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkout } from "@/feature/checkout/composables/checkout.ts";
import { usePayment } from "@/feature/checkout/composables/use.payment.ts";

const { userPayments } = usersStore();
const { isChosenPayment } = checkout();
const { useSavedCard } = usePayment();
</script>

<template>
  <TransitionGroup name="list">
    <li @click="useSavedCard(checkout.cardName, checkout.cardNumber, checkout.expiryDate, checkout.cardCvv, checkout.id)"
        v-for="checkout in userPayments" :key="checkout.id" :class="[`flex flex-col mt-5 transition duration-400 bg-[#D9D9D9]/40
        hover:bg-gray-50 focus:bg-gray-50 border border-gray-300 rounded-xl p-2`, isChosenPayment ? 'bg-gray-50' : '']">
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

<style scoped>

</style>