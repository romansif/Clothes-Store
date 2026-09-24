<template>
  <Transition name="view">
    <ul class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
      <PaymentItem v-for="payment in userPayments"
                   :payment="payment"
                   @delete-payment="toggleDeleteChoice" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";

import PaymentItem from "@/entities/user-payment/ui/PaymentItem.vue";

const { userPayments } = paymentStore();
const { toggleDeleteChoice } = baseDeleteModal();
</script>


<style scoped>

</style>