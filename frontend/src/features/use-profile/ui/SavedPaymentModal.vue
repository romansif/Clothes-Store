<template>
  <div>
    <div @click="toggleSavedPaymentCard" class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                  flex items-center justify-center">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-150 rounded-xl p-5">
        <BaseButton @click="toggleSavedPaymentCard" name="Exit" variant="exitClose"/>
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">CARDS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              May I see your saved cards you used for payment.
            </span>
          </div>
        </div>
        <div v-if="userPayments.length" class="flex flex-col w-full pl-5">
          <PaymentsList />
        </div>
        <PaymentCardEmpty v-else />
      </div>
    </div>
    <Transition name="notify">
      <DeleteModal v-if="deleteChoice" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";

import PaymentCardEmpty from "@/entities/profile/ui/PaymentCardEmpty.vue";
import PaymentsList from "@/features/use-user-payment/ui/PaymentsList.vue";
import BaseButton from "@/shared/ui/base/BaseButton.vue";
import DeleteModal from "@/widgets/base/DeleteModal.vue";

const { userPayments } = paymentStore();
const { toggleSavedPaymentCard, deleteChoice } = useProfileModals();
</script>


<style scoped>

</style>