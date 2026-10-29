<template>
    <ul class="no-scrollbar mt-6 flex h-112 flex-col gap-8 overflow-y-auto">
        <OrderItem v-for="order in orders" :key="order.id" :order="order" />
    </ul>
</template>

<script setup lang="ts">
import { OrderItem } from "@/entities/order-item";
import type { Order } from "@/entities/order";

const props = defineProps<{
    orders: Order[];
}>();
</script>
