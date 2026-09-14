<template>
  <main class="flex justify-center mt-10 xl:justify-between">
    <FilterProducts />
    <div class="flex flex-col">
      <MainHeader />
      <ProductList />
    </div>
  </main>
</template>

<script setup lang="ts">
import ProductList from "@/features/use-main-product/ui/ProductList.vue";
import MainHeader from "@/features/use-main-product/ui/MainHeader.vue";
import FilterProducts from "@/widgets/navigation/ui/FilterProducts.vue";
</script>

<style scoped>

</style>