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
        <Loading v-if="isPending" />
        <ErrorState v-else-if="isError" :box="{ variant: 'payments', state: 'error' }" />
        <div v-if="userPaymentCards.length"
             class="flex flex-col w-full">
          <PaymentsList />
        </div>
        <EmptyState v-else :box="{ variant: 'payments', state: 'empty' }" />
      </div>
    </div>
    <Transition name="modal">
      <DeleteModal v-if="deleteModal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { useSavedPaymentsData } from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { UiButton } from "@/shared/ui/button";
import { DeleteModal } from "@/features/general-delete";
import { PaymentsList } from "@/widgets/user-payment-card-list";
import { EmptyState, ErrorState, Loading } from "@/widgets/state";

const { deleteModal } = baseDeleteModal();
const { toggleSavedPaymentCard } = useProfileModals();
const { userPaymentCards, isPending, isError } = useSavedPaymentsData();
</script>
