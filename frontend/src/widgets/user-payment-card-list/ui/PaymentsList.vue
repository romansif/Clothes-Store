<template>
  <TransitionGroup name="list" tag="ul" class="no-scrollbar grid h-92.5 grid-cols-2 overflow-y-auto pb-4">
    <PaymentItem
      v-for="payment in userPaymentCards"
      :key="payment.id"
      :payment="payment"
      @delete-payment="toggleDeleteChoice"
      @update-card="openEditCard"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { openEditCard } from "@/features/edit-saved-card/lib/toggle-edit-card";
import { useSavedPaymentsData } from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { PaymentItem } from "@/entities/user-payment";

const { userPaymentCards } = useSavedPaymentsData();
const { toggleDeleteChoice } = baseDeleteModal();
</script>
