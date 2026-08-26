<template>
  <TransitionGroup name="list">
    <li v-for="checkout in userPayments" :key="checkout.id"
        class="flex flex-col mt-5 border border-gray-200 rounded-xl shadow-lg p-2">
      <div class="flex flex-col gap-5">
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Expiry Date: <span class="font-normal font-dm-sans">{{ checkout.expiryDate }},</span>
          </span>
          <span class="text-sm font-semibold">
            CVV: <span class="font-normal font-dm-sans">{{ checkout.cardCvv }}</span>
          </span>
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this saved card?', 'DELETE_SAVED_CARD', checkout.id)"
               :src="del" alt="" class="w-5 ml-auto transition duration-400 hover:scale-120">
        </div>
        <div class="flex gap-5">
          <span v-if="checkout.cardName" class="text-sm font-semibold">
            Card Name: <span class="font-normal">{{ checkout.cardName }}</span>
          </span>
          <span class="text-sm font-semibold">
            Card Number: <span class="font-normal font-dm-sans">{{ checkout.cardNumber }}</span>
          </span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { userPayments } = checkoutStore();
const { toggleDeleteChoice } = useProfileModals();

import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";

import del from "@/assets/icons/delete-close/del_address_card.svg";
</script>


<style scoped>


</style>