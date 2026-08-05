<script setup lang="ts">
import { productsStore } from "@/shared/composables/stores/products.store";

import OrderCard from "./OrderCard.vue";

const { items } = productsStore();
</script>

<template>
  <ul :class="['flex flex-col overflow-y-auto gap-8 mt-10 no-scrollbar', items.length > 1 ? 'h-[310px]' : 'h-[150px]']">
    <OrderCard />
  </ul>
</template>

<style scoped>

</style>