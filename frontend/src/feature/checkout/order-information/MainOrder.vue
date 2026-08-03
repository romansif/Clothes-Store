<script setup lang="ts">
import { useCheckout } from "../composables/use.checkout.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

import OrderList from "./order-items/OrderList.vue";

const { items } = productsStore();
const { userPayment } = usersStore();
const { price, totalPrice, commissionPrice } = useCheckout();
</script>

<template>
  <div class="md:px-5 sm:px-4 px-4 lg:w-[300px] xl:w-[400px]">
    <div class="flex">
      <span class="px-2 py-1 bg-white ml-auto">(<span class="text-blue-700 font-medium">{{ items?.length || 0 }}</span>)</span>
    </div>
    <h1 class="font-medium">YOUR ORDER</h1>
    <OrderList />
    <div class="border-b-1 border-gray-300 mt-5"></div>
    <div class="flex flex-col font-medium text-xs mt-3 gap-2">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>$ {{ price }}</span>
      </div>
      <div class="flex justify-between">
        <span>Shipping</span>
        <span v-if="!userPayment.delivery" class="text-gray-400">Calculated at next step</span>
        <span v-if="userPayment.delivery" class="text-gray-400">{{ userPayment.delivery }}</span>
      </div>
    </div>
    <div class="border-b-1 border-gray-300 mt-3 mb-1"></div>
    <span class="text-xs text-[#A3A3A3]">$ {{ commissionPrice }} commission and service operation</span>
    <div class="flex justify-between font-medium mt-3 text-sm">
      <span>Total</span>
      <span>$ {{ totalPrice }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>