<script setup lang="ts">
import { productsStore } from "@/shared/composables/stores/products.store.ts";

import CurrentOrderCard from "./CurrentOrderCard.vue";
import icon_shop from "@/app/assets/icons/icon_shop.svg";

const { orders } = productsStore();
</script>

<template>
  <ul v-if="orders.length > 0" class="flex flex-col gap-8 overflow-y-auto no-scrollbar h-[500px] mt-6">
    <CurrentOrderCard />
  </ul>
  <div v-else class="flex justify-center pt-50">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_shop" alt="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You have no orders</span>
        <span class="text-[#A3A3A3]">It’s the perfect time to browse our product catalog.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>