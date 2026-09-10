<template>
  <Transition name="view">
    <div v-if="productsYear.length === 0" class="flex justify-center mt-15 mb-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">At of now, year collection have not yet appeared</span>
      </div>
    </div>
    <ul v-else v-horizontal-scroll class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar">
      <YearItem />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

import YearItem from "@/widgets/home/home-year-collections/YearItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";

const { productsYear, vHorizontalScroll } = useGetProduct();
</script>


<style scoped>

</style>