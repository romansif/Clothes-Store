<script setup lang="ts">
import { onMounted } from "vue";
import { useProductsModals } from "../../shared/composables/modals/products/productsModals.ts";
import { useGetProducts } from "./composables/getProducts.ts";

import NavBar from "../navigation/NavBar.vue";
import HeaderProducts from "./products-header/HeaderProducts.vue";
import FilterProducts from "./products-header/FilterProducts.vue";
import ProductsList from "./products-items/ProductsList.vue";
import AsideFilter from "../../shared/ui/products-modals/AsideFilter.vue";
import Notification from "../../shared/ui/products-modals/Notification.vue";

const { getFilteredProducts } = useGetProducts();
const { filterAside, notify } = useProductsModals();

onMounted(async () => {
  await getFilteredProducts('ALL', 'Availability');
})
</script>

<template>
  <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
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