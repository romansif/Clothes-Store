<template>
    <ul :class="[
            'no-scrollbar mt-10 flex flex-col gap-8 overflow-y-auto',
            orderItems.length > 1 ? 'h-77.5' : 'h-37.5',
        ]">
        <CheckoutOrderItem v-for="product in orderItems" :product="product" :items="orderItems" />
    </ul>
</template>

<script setup lang="ts">
import { CheckoutOrderItem } from "@/entities/checkout-order-item";
import type { CartItem } from "@/entities/cart-item";

defineProps<{
  orderItems: CartItem[]
}>()
</script>
