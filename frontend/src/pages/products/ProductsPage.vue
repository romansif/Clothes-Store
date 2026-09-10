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
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

import ProductList from "@/entities/product/ui/product/ProductList.vue";
import MainHeader from "@/features/use-product/ui/MainHeader.vue";
import FilterProducts from "@/widgets/navigation/ui/FilterProducts.vue";

const { getFavoriteProducts } = useGetFavorite();
const { getAllProducts, getFilteredProducts } = useGetProduct();

onMounted(async() => {
  await getAllProducts();
  await getFilteredProducts('ALL', 'ALL');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>