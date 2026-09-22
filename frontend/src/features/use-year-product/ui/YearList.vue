<template>
  <Transition name="view">
    <div v-if="productsYear.length === 0" class="flex justify-center mt-15 mb-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">At of now, year collection have not yet appeared</span>
      </div>
    </div>
    <ul v-else v-horizontal-scroll class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar">
      <YearItem v-for="product in productsYear" :product="product"
                :product-year="productsYear" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetYearProduct } from "@/features/use-year-product/api/get-year-product.ts";
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";

import YearItem from "@/entities/year-product/ui/YearItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";

const { vHorizontalScroll } = productsHelper();
const { getFavoriteProducts } = useGetFavorite();
const { getYearProducts, productsYear } = useGetYearProduct();

onMounted(async() => {
  await getFavoriteProducts();
  await getYearProducts('ALL', 'ALL')
})
</script>


<style scoped>

</style>