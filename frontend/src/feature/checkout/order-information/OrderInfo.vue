<script setup lang="ts">
import { checkout } from "../composables/checkout.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms.ts";

import OrderInfoList from "./order-items/OrderInfoList.vue";

const { items } = productsStore();
const { shipping } = checkoutForms();
const { price, totalPrice, commissionPrice } = checkout();
</script>

<template>
  <div class="md:px-5 sm:px-4 px-4 lg:w-75 xl:w-100">
    <div class="flex">
      <span class="px-2 py-1 bg-white ml-auto">(<span class="text-blue-700 font-medium">{{ items?.length || 0 }}</span>)</span>
    </div>
    <h1 class="font-medium">YOUR ORDER</h1>
    <OrderInfoList />
    <div class="border-b border-gray-300 mt-5"></div>
    <div class="flex flex-col font-medium text-xs mt-3 gap-2">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>$ {{ price }}</span>
      </div>
      <div class="flex jus">
        <span>Shipping</span>
        <div class="flex ml-auto gap-2">
          <span v-if="!shipping.delivery" class="text-gray-400">Calculated at next step</span>
          <span v-if="shipping.delivery === 'express'" class="text-gray-400">{{ shipping.delivery }} </span>
          <span v-if="shipping.delivery === 'standard'" class="text-gray-400">{{ shipping.delivery }}</span>
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

<style scoped>

</style>