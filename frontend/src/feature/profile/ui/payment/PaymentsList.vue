<template>
  <ul v-if="userPaymentsCard" class="flex-col overflow-y-auto no-scrollbar h-92.5 pb-4">
    <PaymentsItem />
  </ul>
  <div v-else class="flex justify-center pt-35">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_card" alt="" class="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You have no saved cards</span>
        <span class="text-[#A3A3A3]">
          It’s the perfect time to place your first order.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userPayments } = checkoutStore();

import { computed } from "vue";
import { checkoutStore } from "@/entities/checkout/checkout.store.ts";

import PaymentsItem from "./PaymentsItem.vue";
import icon_card from "@/assets/icons/checkout/payment/icon_card.svg";

const userPaymentsCard = computed(() => {
  return userPayments.value.some(item => 'cardNumber' in item);
});
</script>


<style scoped>

</style>