<script setup lang="ts">

import OrderList from "./order-items/OrderList.vue";
</script>

<template>
  <div class="mt-10 w-[329px]">
    <div class="flex">
      <span class="px-2 py-1 bg-white ml-auto">(<span class="text-blue-700 font-medium">2</span>)</span>
    </div>
    <h1 class="font-medium">YOUR ORDER</h1>
    <OrderList />
    <div class="border-b-1 border-gray-300 mt-5"></div>
    <div class="flex flex-col font-medium text-xs mt-3 gap-2">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>$180.00</span>
      </div>
      <div class="flex justify-between">
        <span>Shipping</span>
        <span class="text-gray-400">Calculated at next step</span>
      </div>
    </div>
    <div class="border-b-1 border-gray-300 mt-3"></div>
    <div class="flex justify-between font-medium mt-3 text-sm">
      <span>TOTAL</span>
      <span>$180.00</span>
    </div>
  </div>
</template>

<style scoped>

</style>