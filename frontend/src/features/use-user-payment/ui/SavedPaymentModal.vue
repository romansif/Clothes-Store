<template>
  <div>
    <div class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
         flex items-center justify-center"
         @click="toggleSavedPaymentCard">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-150 rounded-xl p-5">
        <UiButton name="Exit"
                    variant="exitClose"
                    @click="toggleSavedPaymentCard" />
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">CARDS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              May I see your saved cards you used for payment.
            </span>
          </div>
        </div>
        <div v-if="userPayments.length"
             class="flex flex-col w-full">
          <PaymentsList />
        </div>
        <PaymentCardEmpty v-else />
      </div>
    </div>
    <Transition name="modal">
      <DeleteModal v-if="deleteModal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal";
import { useGetPayment } from "@/features/use-user-payment/api/get-payment";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal";
import { paymentStore } from "@/features/use-user-payment/model/payment.store";

import { UiButton } from "@/shared/ui/button";
import { DeleteModal } from "@/features/use-general-delete";
import { PaymentCardEmpty } from "@/entities/profile";
import { PaymentsList } from "@/features/use-user-payment";

const { getPayments } = useGetPayment();
const { userPayments } = paymentStore();
const { deleteModal } = baseDeleteModal();
const { toggleSavedPaymentCard } = useProfileModals();

onMounted(async () => {
  await getPayments();
})
</script>
