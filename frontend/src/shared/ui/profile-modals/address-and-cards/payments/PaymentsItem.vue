<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";

import del from "@/app/assets/icons/delete-close/del_address_card.svg";

const { userPayments } = usersStore();
const { toggleDeleteChoice } = useProfileModals();
</script>

<template>
  <TransitionGroup name="list">
    <li v-for="checkout in userPayments" :key="checkout.id"
        class="flex flex-col mt-5 border border-gray-200 rounded-xl shadow-lg p-2">
      <div class="flex flex-col gap-5">
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Expiry Date: <span class="font-normal">{{ checkout.expiryDate }},</span>
          </span>
          <span class="text-sm font-semibold">
            CVV: <span class="font-normal">{{ checkout.cardCvv }}</span>
          </span>
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this saved card?', 'DELETE_SAVED_CARD', checkout.id)"
               :src="del" alt="" class="w-[20px] ml-auto transition duration-400 hover:scale-120">
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