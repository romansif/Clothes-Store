<template>
  <ul :class="['flex flex-col overflow-y-auto gap-8 mt-10 no-scrollbar', items.length > 1 ? 'h-77.5' : 'h-37.5']">
    <OrderInfoItem />
  </ul>
</template>

<script setup lang="ts">
const { items } = orderStore();

import { orderStore } from "@/feature/orders/model/order.store.ts";

import OrderInfoItem from "./OrderInfoItem.vue";
</script>

<style scoped>

</style>