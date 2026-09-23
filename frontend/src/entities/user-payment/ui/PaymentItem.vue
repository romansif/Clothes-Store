<template>
  <TransitionGroup name="list" mode="out-in">
    <li :key="payment.id" class="flex flex-col mt-5 border border-gray-200 rounded-xl shadow-lg p-2">
      <div class="flex flex-col gap-5">
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Expiry Date: <span class="font-normal font-dm-sans">{{ payment.expiryDate }},</span>
          </span>
          <span class="text-sm font-semibold">
            CVV: <span class="font-normal font-dm-sans">{{ payment.cardCvv }}</span>
          </span>
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this saved card?', 'DELETE_SAVED_CARD', payment.id)"
               :src="del" alt="" class="w-5 ml-auto transition duration-400 hover:scale-120">
        </div>
        <div class="flex gap-5">
          <span v-if="payment.cardName" class="text-sm font-semibold">
            Card Name: <span class="font-normal">{{ payment.cardName }}</span>
          </span>
          <span class="text-sm font-semibold">
            Card Number: <span class="font-normal font-dm-sans">{{ payment.cardNumber }}</span>
          </span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type {UserPayment} from "@/entities/checkout-payment/model/payment.type.ts";

defineProps<{
  payment: UserPayment;
}>();

const emit = defineEmits<{
  deletePayment: [title: string, type: string, id: string];
}>();

const toggleDeleteChoice = (title: string, type: string, id: string) => {
  emit('deletePayment', title, type, id);
};

import del from "@/assets/icons/delete-close/del_address_card.svg";
</script>


<style scoped>


</style>