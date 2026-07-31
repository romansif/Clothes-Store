<script setup lang="ts">
import { onMounted, onErrorCaptured } from "vue";
import { useGetProducts } from "./composables/get-products.ts";
import { errorHandler } from "@/shared/composables/errors/errors-middleware/error.handler.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";

import NavBar from "../navigation/NavBar.vue";
import ProductsList from "./products-items/ProductsList.vue";
import HeaderProducts from "./products-header/HeaderProducts.vue";
import FilterProducts from "./products-header/FilterProducts.vue";
import Notification from "@/shared/ui/base-modals/Notification.vue";
import AsideFilter from "@/shared/ui/products-modals/AsideFilter.vue";

const { getFilteredProducts } = useGetProducts();
const { filterAside, notify } = useProductsModals();
const { componentError, resetError } = errorHandler();

onErrorCaptured((err, info) => {
  console.error("Перехвачена ошибка в дочернем компоненте:", err);
  console.log("Детали ошибки:", info);

  componentError.value = "An error occurred while displaying the product catalog."

  return false
});

onMounted(async () => {
  await getFilteredProducts('ALL', 'Availability');
})
</script>

<template>
  <div v-if="componentError" class="flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
    <p class="text-sm mb-4">{{ componentError }}</p>
    <button @click="resetError('FILTET')" class="px-4 py-2 mt-5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
      Try again
    </button>
  </div>
  <div v-else class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
    <div class="flex justify-center mt-12 xl:justify-between">
      <FilterProducts />
      <div class="flex flex-col">
        <HeaderProducts />
        <ProductsList />
      </div>
    </div>
  </div>
  <Transition>
    <AsideFilter v-if="filterAside" />
  </Transition>
  <Transition>
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>