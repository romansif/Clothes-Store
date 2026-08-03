<script setup lang="ts">
import { onMounted } from "vue";
import { useOrderCard } from "@/shared/ui/orders/use.order.card.ts";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";
import { useGetProducts } from "@/feature/products/composables/get.products.ts";

import CurrentOrderList from "./CurrentOrderList.vue";
import BaseButton from "@/shared/ui/base/BaseButton.vue";
import ClipboardNotify from "@/shared/ui/base/base-modals/ClipboardNotify.vue";

const { items } = useOrderCard();
const { clipboard } = useOrderCard();
const { getFilteredOrders } = useGetProducts();
const { toggleCurrentOrder } = useProfileModals();

onMounted(async () => {
  await getFilteredOrders();
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="flex flex-col bg-white w-[890px] h-[650px] rounded-xl p-5">
      <BaseButton @click.stop="toggleCurrentOrder" name="Exit" variant="exitClose"/>
      <div class="flex flex-col gap-2 border-b py-4">
        <h1 class="font-bold text-2xl">ACTIVE ORDERS</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">Purchase history and status tracking.</span>
            <span class="ml-auto h-fit px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-md">
              Всего заказов: {{ items?.length }}
            </span>
          </div>
      </div>
      <CurrentOrderList />
      <Transition>
        <ClipboardNotify v-if="clipboard"/>
      </Transition>
    </div>
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