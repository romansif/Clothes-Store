<template>
  <ul :class="['flex flex-col overflow-y-auto gap-8 mt-10 no-scrollbar', items.length > 1 ? 'h-77.5' : 'h-37.5']">
    <OrderInfoItem />
  </ul>
</template>

<script setup lang="ts">
import { orderStore } from "@/features/use-order/model/order.store.ts";

import OrderInfoItem from "./OrderInfoItem.vue";

const { items } = orderStore();
</script>

<style scoped>

</style>