<template>
  <TransitionGroup name="list" tag="ul"
                   :class="['no-scrollbar mt-10 flex flex-col gap-8 overflow-y-auto',
                   props.orderItems.length > 1 ? 'h-77.5' : 'h-37.5']">
    <CheckoutOrderItem v-for="product in props.orderItems"
                       :key="product.id"
                       :product="product" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { CheckoutOrderItem } from "@/entities/checkout-order-item";
import type { CartItem } from "@/entities/cart-item";

const props = defineProps<{
  orderItems: CartItem[];
}>();
</script>
