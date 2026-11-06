<template>
  <main class="flex justify-center xl:gap-21.5">
    <FilterProducts />
    <div class="flex flex-col">
      <HeaderFilter />
      <ProductList :user="user" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { ProductList } from "@/widgets/product-list";
import { HeaderFilter } from "@/widgets/filter-products";
import { FilterProducts } from "@/widgets/filter-products";

const { user } = useUserData();
</script>
