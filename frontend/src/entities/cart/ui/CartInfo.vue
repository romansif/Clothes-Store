<template>
  <div class="flex flex-col mt-7.5 gap-4 font-medium w-100">
    <div class="flex flex-col gap-2 sm:pb-3">
    <span class="text-lg xl:text-xl">
      ORDER SUMMARY
    </span>
      <div class="flex flex-col mt-2 gap-1 sm:gap-2 xl:mt-4">
        <div class="flex justify-between text-sm xl:text-lg">
          <span>Subtotal</span>
          <span class="font-dm-sans">$ {{ price }}</span>
        </div>
        <div class="flex justify-between text-sm xl:text-lg">
          <span>Shipping</span>
          <span class="font-dm-sans">$ {{ price }}</span>
        </div>
      </div>
    </div>
    <div class="border-b"></div>
    <div class="flex items-center justify-between text-lg lg:gap-12 xl:text-xl">
      <div class="flex flex-col">
      <span class="text-xs text-[#A3A3A3] font-dm-sans">
        $ {{ commissionPrice }} commission and service operation
      </span>
        <div class="flex items-center gap-2 mt-3">
          <h1 class="font-medium">TOTAL</h1>
          <span class="text-[#A3A3A3] text-sm xl:text-lg">(TAX INCL.)</span>
        </div>
      </div>
      <span class="font-dm-sans">$ {{ totalPrice }}</span>
    </div>
    <ContinueToOrder />
  </div>
</template>

<script setup lang="ts">
import { useCartOrderInfo } from "@/features/use-cart/lib/cart-order-info.ts";

import ContinueToOrder from "@/features/use-cart/ui/ContinueToOrder.vue";

const { price, commissionPrice, totalPrice } = useCartOrderInfo();
</script>

<style scoped>

</style>