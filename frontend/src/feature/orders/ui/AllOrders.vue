<template>
  <div>
    <div v-if="!choiceModal" @click="toggleOrderHistory" class="font-[Montserrat] fixed inset-0 z-50
        bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-162.5 rounded-xl p-5">
        <BaseButton @click="toggleOrderHistory" name="Exit" variant="exitClose"/>
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">
            ALL ORDERS
          </h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              Purchase history and status tracking.
            </span>
            <span class="ml-auto h-fit px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-md">
              Всего заказов: {{ orders.length }}
            </span>
          </div>
        </div>
        <OrdersList/>
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

<script setup lang="ts">
const { orders } = orderStore();
const { clipboard } = useOrder();
const { getOrders } = ordersApi();
const { choiceModal } = useBaseModals();
const { toggleOrderHistory } = useProfileModals();

import { onMounted } from "vue";
import { useOrder } from "@/feature/orders/lib/use-order.ts";
import { orderStore } from "@/feature/orders/model/order.store.ts";
import { ordersApi } from "@/feature/orders/api/orders.api.ts";
import { useProfileModals } from "@/feature/profile/lib/profile.modals.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";

import OrdersList from "@/feature/orders/ui/OrderList.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ClipboardNotify from "@/shared/ui/ClipboardNotify.vue";
import ReplacementChoice from "@/shared/ui/ReplacementChoice.vue";

onMounted(async () => {
  await getOrders();
})
</script>

<style scoped>

</style>