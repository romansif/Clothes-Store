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
import { ProductList } from "@/features/use-main-product";
import { MainHeader } from "@/features/use-main-product";
import { FilterProducts } from "@/widgets/ui/product-sidebar";
</script>