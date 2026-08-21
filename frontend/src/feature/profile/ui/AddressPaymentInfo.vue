<template>
  <div>
    <div @click="toggleAddressesAndCards" class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                  flex items-center justify-center">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-150 rounded-xl p-5">
        <BaseButton @click="toggleAddressesAndCards" name="Exit" variant="exitClose"/>
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">ADDRESSES AND CARDS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              May I see your saved delivery address and the cards you used for payment.
            </span>
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
const { getAddresses } = addressApi();
const { getPayments } = paymentApi();
const { userAddresses, userPayments } = checkoutStore();
const { toggleAddressesAndCards, deleteChoice } = useProfileModals();

import { onMounted } from "vue";
import { checkoutStore } from "@/feature/checkout/model/checkout.store.ts";
import { useProfileModals } from "@/feature/profile/lib/profile.modals.ts";
import { addressApi } from "@/feature/checkout/api/address.api.ts";
import { paymentApi } from "@/feature/checkout/api/payment.api.ts";

import PaymentsList from "@/feature/profile/ui/payment/PaymentsList.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import AddressesList from "@/feature/profile/ui/address/AddressesList.vue";
import icon_card from "@/assets/icons/checkout/payment/icon_card.svg";
import icon_address from "@/assets/icons/checkout/icon_address.svg";
import DeleteModal from "@/shared/ui/DeleteModal.vue";

onMounted(async () => {
  await getAddresses();
  await getPayments();
})
</script>

<style scoped>

</style>