<template>
  <div>
    <div v-if="!choiceModal"
         class="font-raleway fixed inset-0 z-50
        bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
         @click="toggleCurrentOrder">
      <main @click.stop class="flex flex-col bg-white w-222.5 h-162.5 rounded-xl p-5">
        <UiButton name="Exit"
                    variant="exitClose"
                    @click="toggleCurrentOrder" />
        <header class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">ACTIVE ORDERS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">Purchase history and status tracking.</span>
            <span class="ml-auto h-fit px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-md">
              Всего заказов: {{ orders?.length }}
            </span>
          </div>
        </header>
        <OrderList />
        <Transition name="modal">
          <Clipboard v-if="clipboard" />
        </Transition>
      </main>
    </div>
    <Transition name="modal">
      <ReplacementModal v-if="choiceModal" />
    </Transition>
    <Transition name="modal">
      <CreateReview v-if="reviewFormModal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useOrder } from "@/features/use-order/lib/use-order.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { useGetOrder } from "@/features/use-order/api/get-order.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { reviewFormModal } from "@/features/use-review-form/lib/review-form-modal.ts";
import { choiceModal } from "@/features/use-order/lib/order-modal.ts";

import OrderList from "./OrderList.vue";
import UiButton from "@/shared/ui/button/UiButton.vue";
import ReplacementModal from "@/features/use-order/ui/ReplacementModal.vue";
import CreateReview from "@/features/use-review-form/ui/CreateReview.vue";
import Clipboard from "@/widgets/ui/clipboard/Clipboard.vue";

const { orders } = orderStore();
const { clipboard } = useOrder();
const { getFilteredOrders } = useGetOrder();
const { toggleCurrentOrder } = useProfileModals();

onMounted(async () => {
  await getFilteredOrders();
})
</script>

<style scoped>

</style>