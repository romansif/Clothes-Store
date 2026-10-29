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
        <Transition name="view" mode="out-in">
          <div>
            <Loader v-if="isLoading" variant="orders" />
            <ErrorState v-else-if="isError" variant="orders" />
            <OrderList v-else-if="orders.length" :orders="orders" />
            <EmptyState v-else variant="orders" />
          </div>
        </Transition>
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
import { useOrderData } from "@/widgets/order-list/lib/use-order-data";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { reviewFormModal } from "@/entities/order-action/lib/review-form-modal";
import { choiceModal } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import { Clipboard } from "@/widgets/clipboard";
import { ReplacementModal } from "@/features/order-modals";
import { CreateReview } from "@/features/add-review";
import { OrderList } from "@/widgets/order-list";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";

const { clipboard } = useOrder();
const { toggleOrderHistory } = useProfileModals();
const { orders, isLoading, isError } = useOrderData();
</script>
