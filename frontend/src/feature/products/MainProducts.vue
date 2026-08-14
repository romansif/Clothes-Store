<script setup lang="ts">
import { onMounted, onErrorCaptured } from "vue";
import { useProducts } from "./composables/use.products.ts";
import { errorHandler } from "@/shared/composables/errors/errors-middleware/error.handler";
import { useProductsModals } from "@/shared/composables/modals/products.modals";
import { useBaseModals } from "@/shared/composables/modals/base.modals";

import NavBar from "../navigation/NavBar.vue";
import ProductsList from "./products-items/ProductsList.vue";
import HeaderProducts from "./products-header/HeaderProducts.vue";
import FilterProducts from "./products-header/FilterProducts.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";
import AsideFilter from "@/shared/ui/products-modals/AsideFilter.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";

const { filterAside } = useProductsModals();
const { getAllProducts } = useProducts();
const { notify, loading } = useBaseModals();
const { componentError, resetError } = errorHandler();

onErrorCaptured((err, info) => {
  console.error("Перехвачена ошибка в дочернем компоненте:", err);
  console.log("Детали ошибки:", info);

  componentError.value = "An error occurred while displaying the product catalog."

  return false
});

onMounted(async () => {
  await getAllProducts();
})
</script>

<template>
  <Loading v-if="loading" />
  <div v-else-if="componentError" class="flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
    <p class="text-sm mb-4">{{ componentError }}</p>
    <button @click="resetError('FILTER')" class="px-4 py-2 mt-5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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
  <Transition name="notify">
    <AsideFilter v-if="filterAside" />
  </Transition>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>

</style>