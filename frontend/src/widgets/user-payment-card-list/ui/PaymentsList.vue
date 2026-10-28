<template>
  <Transition name="view">
    <ul class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
      <PaymentItem v-for="payment in userPaymentCard"
                   :key="payment.id"
                   :payment="payment"
                   @delete-payment="toggleDeleteChoice" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { useSavedPaymentData } from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { PaymentItem } from "@/entities/user-payment";

const { userPaymentCard } = useSavedPaymentData();
const { toggleDeleteChoice } = baseDeleteModal();
</script>
