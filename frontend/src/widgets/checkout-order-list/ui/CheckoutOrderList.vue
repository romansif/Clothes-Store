<template>
  <TransitionGroup
    name="list"
    tag="ul"
    :class="[
      'no-scrollbar mt-10 flex flex-col gap-8 overflow-y-auto',
      props.orderItems.length > 1 ? 'h-77.5' : 'h-37.5',
    ]"
  >
    <CheckoutOrderItem
      v-for="product in props.orderItems"
      :key="product.id"
      :product="product"
      :checkout-items="checkoutItems"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { CheckoutOrderItem } from "@/entities/checkout-order-item";
import { useCheckoutItems } from "@/features/checkout-order-info";
import type { CartItem } from "@/shared/model";

const props = defineProps<{
  orderItems: CartItem[];
}>();

const { checkoutItems } = useCheckoutItems();
</script>
