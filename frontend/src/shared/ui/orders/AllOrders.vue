<script setup lang="ts">
import { onMounted } from "vue";
import { useOrderCard } from "@/shared/ui/orders/use.order.card.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useOrders } from "@/feature/products/composables/use.orders.ts";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";

import OrdersList from "@/shared/ui/orders/order-items/OrderList.vue";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import ClipboardNotify from "@/shared/ui/base/base-modals/ClipboardNotify.vue";
import ReplacementChoice from "@/shared/ui/base/base-modals/ReplacementChoice.vue";

const { orders } = productsStore();
const { clipboard } = useOrderCard();
const { getOrders } = useOrders();
const { choiceModal, loadData } = useBaseModals();
const { toggleOrderHistory } = useProfileModals();

onMounted(async () => {
  try{
    await getOrders();
  }finally{
    await loadData()
  }
})
</script>

<template>
  <div>
    <div v-if="!choiceModal" class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
        flex items-center justify-center">
      <div class="flex flex-col bg-white w-[890px] h-[650px] rounded-xl p-5">
        <BaseButton @click.stop="toggleOrderHistory" name="Exit" variant="exitClose"/>
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">ALL ORDERS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">Purchase history and status tracking.</span>
            <span class="ml-auto h-fit px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-md">
              Всего заказов: {{ orders.length }}
            </span>
          </div>
        </div>
        <OrdersList/>
        <Transition>
          <ClipboardNotify v-if="clipboard" />
        </Transition>
      </div>
    </div>
    <Transition>
      <ReplacementChoice v-if="choiceModal" />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>