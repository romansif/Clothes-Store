<template>
  <Transition name="view">
    <div v-if="!userPaymentsCard" class="flex justify-center pt-35">
      <div class="flex flex-col items-center gap-5">
        <img :src="icon_card" alt="" class="">
        <div class="flex flex-col gap-2 items-center">
          <span class="font-bold">You have no saved cards</span>
          <span class="text-[#A3A3A3]">
            It’s the perfect time to place your first order.
          </span>
        </div>
      </div>
    </div>
    <ul v-else class="grid grid-cols-2 overflow-y-auto no-scrollbar h-92.5 pb-4">
      <PaymentItem v-for="payment in userPayments" :payment="payment"
                    @delete-payment="toggleDeleteChoice" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";

import PaymentItem from "@/entities/user-payment/ui/PaymentItem.vue";
import icon_card from "@/assets/icons/checkout/payment/icon_card.svg";

const { userPayments } = paymentStore();
const { toggleDeleteChoice } = baseDeleteModal();

const userPaymentsCard = computed(() => {
  return userPayments.value.some(item => 'cardNumber' in item);
});
</script>


<style scoped>

</style>