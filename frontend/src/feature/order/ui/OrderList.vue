<template>
  <ul v-if="orders.length > 0" class="flex flex-col gap-8 overflow-y-auto no-scrollbar h-125 mt-6">
    <OrderItem />
  </ul>
  <div v-else class="flex justify-center pt-50">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_shop" alt="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You have no orders</span>
        <span class="text-[#A3A3A3]">
          It’s the perfect time to browse our product catalog.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { orders } = orderStore();

import { orderStore } from "@/feature/order/model/order.store.ts";

import icon_shop from "@/assets/icons/products/icon_shop.svg";
import OrderItem from "@/feature/order/ui/OrderItem.vue";
</script>


<style scoped>

</style>