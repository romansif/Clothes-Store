<script setup lang="ts">
import { computed } from "vue";
import { usersStore } from "../../../../composables/stores/users.store.ts";

import CardsCard from "./CardsCard.vue";
import icon_card from "../../../../../app/assets/icons/icon_card.svg";

const { userPayments } = usersStore();
const userPaymentsCard = computed(() => {
  return userPayments.value.some(item => 'cardNumber' in item);
});
</script>

<template>
  <ul v-if="userPaymentsCard" class="flex-col overflow-y-auto no-scrollbar h-[370px] pb-4">
    <CardsCard />
  </ul>
  <div v-else class="flex justify-center pt-35">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_card" alt="" class="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You have no saved cards</span>
        <span class="text-[#A3A3A3]">It’s the perfect time to place your first order.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>