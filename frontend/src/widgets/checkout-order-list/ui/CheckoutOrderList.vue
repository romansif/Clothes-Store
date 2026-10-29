<template>
    <ul
        :class="[
            'no-scrollbar mt-10 flex flex-col gap-8 overflow-y-auto',
            items.length > 1 ? 'h-77.5' : 'h-37.5',
        ]"
    >
        <CheckoutOrderItem v-for="product in items" :product="product" :items="items" />
    </ul>
</template>

<script setup lang="ts">
import { orderStore } from "@/shared/model/order.store";
import { CheckoutOrderItem } from "@/entities/checkout-order-item";

const { items } = orderStore();
</script>
