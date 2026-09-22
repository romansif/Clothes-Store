<template>
  <div>
    <div @click="toggleAddressesAndCards" class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
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
        <AddressPaymentEmpty v-else />
      </div>
    </div>
    <Transition name="notify">
      <DeleteModal v-if="deleteChoice"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";

import PaymentsList from "@/features/use-user-payment/ui/PaymentsList.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import AddressesList from "@/features/use-user-address/ui/AddressesList.vue";
import DeleteModal from "@/widgets/base/DeleteModal.vue";
import AddressPaymentEmpty from "@/entities/profile/ui/AddressPaymentEmpty.vue";

const { userPayments } = paymentStore();
const { userAddresses } = informationContactStore();
const { toggleAddressesAndCards, deleteChoice } = useProfileModals();
</script>

<style scoped>

</style>