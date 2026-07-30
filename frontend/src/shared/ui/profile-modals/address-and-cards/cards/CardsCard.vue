<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useProfileModals } from "@/shared/composables/modals/profile/profileModals.ts";

import del from "@/app/assets/icons/del_address_card.svg";

const { userPayments } = usersStore();
const { toggleDeleteChoice } = useProfileModals();
</script>

<template>
  <TransitionGroup name="list">
    <li v-for="checkout in userPayments" :key="checkout.id"
        class="flex flex-col mt-5 border border-gray-200 rounded-xl shadow-lg p-2 transition duration-400 hover:scale-108">
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
               :src="del" alt="" class="w-[20px] ml-auto ">
        </div>
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Card Name: <span class="font-normal">{{ checkout.cardName }},</span>
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
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>