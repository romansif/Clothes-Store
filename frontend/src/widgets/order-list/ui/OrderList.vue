<template>
  <Transition name="view" mode="out-in">
    <ul class="flex flex-col gap-8 overflow-y-auto no-scrollbar h-125 mt-6">
      <OrderItem v-for="order in orders"
                 :key="order.id"
                 :order="order" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { orderStore } from "@/shared/model/order.store";

import { OrderItem } from "@/entities/order-item";

const { orders } = orderStore();
</script>
