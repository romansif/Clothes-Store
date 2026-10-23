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
import { ProductList } from "@/widgets/product-list";
import { MainHeader } from "@/features/products";
import { FilterProducts } from "@/widgets/product-sidebar";
</script>