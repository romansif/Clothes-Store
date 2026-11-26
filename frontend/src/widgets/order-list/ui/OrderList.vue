<template>
  <TransitionGroup name="list" tag="ul" class="flex flex-col gap-6 pb-4">
    <Order v-for="order in orders" :key="order.id" :order="order" :orders="props.orders" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { Order } from "@/entities/order-item";
import type { OrderProps } from "@/entities/order";

const props = defineProps<{
  orders: OrderProps[];
}>();
</script>
