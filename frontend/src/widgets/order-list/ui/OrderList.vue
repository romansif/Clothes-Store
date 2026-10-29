<template>
  <ul class="flex flex-col gap-8 overflow-y-auto no-scrollbar h-112 mt-6">
    <OrderItem v-for="order in orders"
               :key="order.id"
               :order="order" />
  </ul>
</template>

<script setup lang="ts">
import { OrderItem } from "@/entities/order-item";
import type { Order } from "@/entities/order";

const props = defineProps<{
  orders: Order[]
}>()
</script>
