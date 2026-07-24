<script setup lang="ts">
import { onMounted } from "vue";
import { useProfileModals } from "../../../composables/modals/profile/profileModals.ts";
import { useGetProfile } from "../../../../feature/profile/profile-composables/getProfile.ts";
import { usersStore } from "../../../composables/stores/users.store.ts"
  ;
import AddressesList from "./addresses/AddressesList.vue";
import CardsList from "./cards/CardsList.vue";

import icon_address from "../../../../app/assets/icons/icon_address.svg";
import icon_card from "../../../../app/assets/icons/icon_card.svg";

const { userAddresses, userPayments } = usersStore();
const { getAddresses, getPayments } = useGetProfile();
const { toggleAddressesAndCards } = useProfileModals()

onMounted(async () => {
  await getAddresses();
  await getPayments();
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="flex flex-col bg-white w-[890px] h-[600px] rounded-xl p-5">
      <button @click.stop="toggleAddressesAndCards" class="text-start ml-auto h-fit w-fit px-10 py-2
          bg-red-500 text-white font-medium text-xs rounded-md">
        Exit
      </button>
      <div class="flex flex-col gap-2 border-b py-4">
        <h1 class="font-bold text-2xl">ADDRESSES AND CARDS</h1>
        <div class="flex">
          <span class="text-sm text-[#A3A3A3]">May I see your saved delivery addresses and the cards you used for payment.</span>
        </div>
      </div>
      <div v-if="userAddresses.length > 0 || userPayments.length > 0" class="flex justify-between pt-10">
        <div class="flex flex-col w-full pr-5">
          <span class="font-semibold">
            SHIPPING ADDRESSES
          </span>
          <AddressesList />
        </div>
        <div class="border-l"></div>
        <div class="flex flex-col w-full pl-5">
          <span class="font-semibold">
              PAYMENT CARDS
          </span>
          <CardsList />
        </div>
      </div>
      <div v-else class="flex justify-center pt-45">
        <div class="flex flex-col items-center gap-5">
          <div class="relative">
            <img :src="icon_card" alt="" class="rotate-105 mb-5">
            <img :src="icon_address" alt="" class="absolute bottom-1 left-11">
          </div>
          <div class="flex flex-col gap-2 items-center">
            <span class="font-bold">You have no saved addresses or cards</span>
            <span class="text-[#A3A3A3]">It’s the perfect time to place your first order.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>