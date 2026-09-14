<template>
  <main class="flex justify-center mt-12 xl:justify-between">
    <FilterProducts />
    <div class="flex flex-col">
      <MainHeader />
      <ProductList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProducts } from "@/features/use-main-product/api/get-product.ts";

import ProductList from "@/features/use-main-product/ui/ProductList.vue";
import MainHeader from "@/features/use-main-product/ui/MainHeader.vue";
import FilterProducts from "@/widgets/navigation/ui/FilterProducts.vue";

const { getFavoriteProducts } = useGetFavorite();
const { getAllProducts, getFilteredProducts } = useGetProducts();

onMounted(async() => {
  await getAllProducts();
  await getFilteredProducts('ALL', 'ALL');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>