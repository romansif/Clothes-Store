<template>
  <div>
    <div v-if="!choiceModal"
         class="font-raleway fixed inset-0 z-50
        bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
         @click="toggleOrderHistory">
      <main @click.stop class="flex flex-col bg-white w-222.5 h-162.5 rounded-xl p-5">
        <UiButton name="Exit"
                    variant="exitClose"
                    @click="toggleOrderHistory" />
        <header class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">
            ALL ORDERS
          </h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              Purchase history and status tracking.
            </span>
            <span class="ml-auto h-fit px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-md font-dm-sans">
              Всего заказов: {{ orders.length }}
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
import { useOrder } from "@/entities/order-item/lib/use-order";
import { orderStore } from "@/shared/model/order.store";
import { useGetOrder } from "@/features/order-modals/api/get-order";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal";
import { reviewFormModal } from "@/entities/order-action/lib/review-form-modal";
import { choiceModal } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import { Clipboard } from "@/widgets/clipboard";
import { ReplacementModal } from "@/features/order-modals";
import { CreateReview } from "@/features/use-review-form";
import { OrderList } from "@/widgets/order-list";

const { orders } = orderStore();
const { clipboard } = useOrder();
const { getOrders } = useGetOrder();
const { toggleOrderHistory } = useProfileModals();

onMounted(async () => {
  await getOrders();
})
</script>
