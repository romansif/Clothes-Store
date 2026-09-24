<template>
  <Transition name="view" mode="out-in">
    <ul class="flex flex-col gap-8 overflow-y-auto no-scrollbar h-125 mt-6">
      <OrderItem v-for="order in orders"
                 :order="order" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { orderStore } from "@/features/use-order/model/order.store.ts";

import OrderItem from "@/features/use-order/ui/OrderItem.vue";

const { orders } = orderStore();
</script>


<style scoped>

</style>