<template>
  <TransitionGroup name="list" tag="ul" class="flex min-h-76 flex-col overflow-y-auto">
    <OrderItem v-for="item in orderItems" :key="item.id" :order="props.order" :item="item" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useOrderItemsData } from "@/shared/lib/use-order-data";
import { OrderItem } from "@/entities/order-item";
import type { OrderProps } from "@/entities/order/model/order.types";

const props = defineProps<{
  order: OrderProps;
}>();

const { orderItems } = useOrderItemsData(props.order.id);
</script>
