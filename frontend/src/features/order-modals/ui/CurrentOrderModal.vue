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
              Всего заказов: {{ activeOrders.length }}
            </span>
          </div>
        </header>
        <Loading v-if="isPending" />
        <ErrorState v-else-if="isError" :box="{ variant: 'orders', state: 'error' }" />
        <OrderList v-else-if="activeOrders.length" :orders="activeOrders" />
        <EmptyState v-else :box="{ variant: 'orders', state: 'empty' }" />
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
import { useOrder } from "@/entities/order-item/lib/use-order";
import { useActiveOrderData } from "@/widgets/order-list/lib/use-order-data";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { reviewFormModal } from "@/entities/order-action/lib/review-form-modal";
import { choiceModal } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import { Clipboard } from "@/widgets/clipboard";
import { ReplacementModal } from "@/features/order-modals";
import { CreateReview } from "@/features/add-review";
import { OrderList } from "@/widgets/order-list";
import { EmptyState, ErrorState, Loading } from "@/widgets/state";

const { clipboard } = useOrder();
const { toggleCurrentOrder } = useProfileModals();
const { activeOrders, isPending, isError } = useActiveOrderData()
</script>
