<template>
  <div class="md:px-5 sm:px-4 px-4 lg:w-75 xl:w-100">
    <div class="flex">
      <h1 class="font-medium mt-2.5">YOUR ORDER</h1>
      <span class="px-2 py-1 bg-white ml-auto">
        (
          <span class="text-blue-700 font-medium font-dm-sans">
          {{ items?.length || 0 }}
          </span>
        )
      </span>
    </div>
    <OrderInfoList />
    <div class="border-b border-gray-300 mt-5"></div>
    <div class="flex flex-col font-medium text-xs mt-3 gap-2">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>$ {{ price }}</span>
      </div>
      <div class="flex items-center">
        <span>Shipping</span>
        <div class="flex ml-auto gap-2">
          <span v-if="!shipping.delivery" class="text-gray-400">Calculated at next step</span>
          <span v-if="shipping.delivery === 'express'" class="text-gray-400">
            {{ shipping.delivery }}
          </span>
          <span v-if="shipping.delivery === 'standard'" class="text-gray-400">
            {{ shipping.delivery }}
          </span>
        </div>
      </div>
    </div>
    <div class="border-b border-gray-300 mt-3 mb-1"></div>
    <span class="text-xs text-[#A3A3A3]">$ {{ commissionPrice }} commission and service operation</span>
    <div class="flex justify-between font-medium mt-3 text-sm">
      <span>Total</span>
      <span>$ {{ totalPrice }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

const { items } = orderStore();
const { shipping } = checkoutForm();
const { price, totalPrice, commissionPrice } = useCheckout();

import { orderStore } from "@/entities/order/model/order.store.ts";
import { useCheckout } from "@/features/use-checkout/model/use-checkout.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";

import OrderInfoList from "./OrderInfoList.vue";
</script>

<style scoped>

</style>