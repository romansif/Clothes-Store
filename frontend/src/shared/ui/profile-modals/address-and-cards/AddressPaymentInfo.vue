<template>
  <div>
    <div @click="toggleAddressesAndCards" class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                  flex items-center justify-center">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-150 rounded-xl p-5">
        <BaseButton @click="toggleAddressesAndCards" name="Exit" variant="exitClose"/>
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">ADDRESSES AND CARDS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">May I see your saved delivery address and the cards you used for payment.</span>
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
            <PaymentsList />
          </div>
        </div>
        <div v-else class="flex justify-center pt-45">
          <div class="flex flex-col items-center gap-5">
            <div class="relative">
              <img :src="icon_card" alt="" class="rotate-105 mb-5">
              <img :src="icon_address" alt="" class="absolute bottom-1 left-11">
            </div>
            <div class="flex flex-col gap-2 items-center">
              <span class="font-bold">You have no saved address or cards</span>
              <span class="text-[#A3A3A3]">It’s the perfect time to place your first order.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Transition name="notify">
      <DeleteModal v-if="deleteChoice"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usersStore } from "@/shared/composables/stores/users.store"
import { useProfileModals } from "@/shared/composables/modals/profile.modals";
import { useAddress } from "@/feature/checkout/checkout-actions/use.address.ts";
import { usePayment } from "@/feature/checkout/checkout-actions/use.payment.ts";

import PaymentsList from "@/shared/ui/profile-modals/address-and-cards/payments/PaymentsList.vue";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import AddressesList from "./addresses/AddressesList.vue";
import icon_card from "@/app/assets/icons/checkout/payment/icon_card.svg";
import icon_address from "@/app/assets/icons/checkout/icon_address.svg";
import DeleteModal from "@/shared/ui/base/base-modals/DeleteModal.vue";

const { getAddresses } = useAddress();
const { getPayments } = usePayment();
const { userAddresses, userPayments } = usersStore();
const { toggleAddressesAndCards, deleteChoice } = useProfileModals();


onMounted(async () => {
  await getAddresses();
  await getPayments();
})
</script>

<style scoped>

</style>