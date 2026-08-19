<script setup lang="ts">
import { onMounted } from "vue";
import { useOrderCard } from "@/shared/ui/orders/use.order.card.ts";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";
import { useOrders } from "@/feature/products/products-actions/use.orders.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";

import OrderList from "./order-items/OrderList.vue";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import ClipboardNotify from "@/shared/ui/base/base-modals/ClipboardNotify.vue";

import ReplacementChoice from "@/shared/ui/base/base-modals/ReplacementChoice.vue";

const { items } = useOrderCard();
const { clipboard } = useOrderCard();
const { choiceModal } = useBaseModals();
const { getFilteredOrders } = useOrders();
const { toggleCurrentOrder } = useProfileModals();

onMounted(async () => {
  await getFilteredOrders();
})
</script>

<template>
  <div>
    <div v-if="!choiceModal" @click="toggleCurrentOrder" class="font-[Montserrat] fixed inset-0 z-50
        bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-162.5 rounded-xl p-5">
        <BaseButton @click="toggleCurrentOrder" name="Exit" variant="exitClose"/>
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">ACTIVE ORDERS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">Purchase history and status tracking.</span>
            <span class="ml-auto h-fit px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-md">
              Всего заказов: {{ items?.length }}
            </span>
          </div>
        </div>
        <OrderList />
        <Transition name="notify">
          <ClipboardNotify v-if="clipboard" />
        </Transition>
      </div>
    </div>
    <Transition name="notify">
      <ReplacementChoice v-if="choiceModal" />
    </Transition>
  </div>
</template>

<style scoped>

</style>