<script setup lang="ts">
import { onMounted } from "vue";
import { usersStore } from "@/shared/composables/stores/users.store.ts"
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";
import { useGetProfile } from "@/feature/profile/profile-composables/get-profile-info.ts";

import CardsList from "./cards/CardsList.vue";
import BaseButton from "@/shared/ui/button/BaseButton.vue";
import AddressesList from "./addresses/AddressesList.vue";
import icon_card from "@/app/assets/icons/icon_card.svg";
import icon_address from "@/app/assets/icons/icon_address.svg";
import ChoiceModal from "../../base-modals/ChoiceModal.vue";

const { userAddresses, userPayments } = usersStore();
const { getAddresses, getPayments } = useGetProfile();
const { toggleAddressesAndCards, deleteChoice } = useProfileModals();


onMounted(async () => {
  await getAddresses();
  await getPayments();
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="flex flex-col bg-white w-[890px] h-[600px] rounded-xl p-5">
      <BaseButton @click.stop="toggleAddressesAndCards" name="Exit" variant="exitClose"/>
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
  <Transition>
    <ChoiceModal v-if="deleteChoice"/>
  </Transition>
</template>

<style scoped>

/* мы объясним, что делают эти классы дальше! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>