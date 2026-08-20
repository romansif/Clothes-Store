<template>
  <ul :class="['flex flex-col overflow-y-auto gap-8 mt-10 no-scrollbar', items.length > 1 ? 'h-77.5' : 'h-37.5']">
    <OrderInfoItem />
  </ul>
</template>

<script setup lang="ts">
const { items } = productsStore();

import { productsStore } from "@/shared/composables/stores/products.store";

import OrderInfoItem from "./OrderInfoItem.vue";
</script>

<style scoped>

</style>