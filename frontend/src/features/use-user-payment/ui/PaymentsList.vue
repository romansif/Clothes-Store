<template>
  <Transition name="view">
    <ul class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
      <PaymentItem v-for="payment in userPayments"
                   :key="payment.id"
                   :payment="payment"
                   @delete-payment="toggleDeleteChoice" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal";
import { paymentStore } from "@/shared/model/payment.store";

import { PaymentItem } from "@/entities/user-payment";

const { userPayments } = paymentStore();
const { toggleDeleteChoice } = baseDeleteModal();
</script>
