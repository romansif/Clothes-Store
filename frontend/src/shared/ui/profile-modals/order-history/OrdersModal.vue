<script setup lang="ts">
import { onMounted } from "vue";
import { useGetProducts } from "../../../../feature/products/composables/getProducts.ts";
import { productsStore } from "../../../composables/stores/products.store.ts";
import { useProfileModals } from "../../../composables/modals/profile/profileModals.ts";


import OrdersList from "./OrdersList.vue";

const { orders } = productsStore();
const { getOrders } = useGetProducts();
const { toggleOrderHistory } = useProfileModals();

onMounted(async () => {
  await getOrders();
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="flex flex-col bg-white w-[890px] h-[650px] rounded-xl p-5">
      <button @click.stop="toggleOrderHistory" class="text-start ml-auto h-fit w-fit px-10 py-2 bg-red-500 text-white font-medium
               text-xs rounded-md">
        Exit
      </button>
      <div class="flex flex-col gap-2 border-b py-4">
        <h1 class="font-bold text-2xl">ALL ORDERS</h1>
        <div class="flex">
          <span class="text-sm text-[#A3A3A3]">Purchase history and status tracking.</span>
          <span class="ml-auto h-fit px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-md">
              Всего заказов: {{ orders.length }}
            </span>
        </div>
      </div>
      <OrdersList />
    </div>
  </div>
</template>

<style scoped>

</style>