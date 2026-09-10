<template>
  <main class="flex flex-col mt-14">
    <SeasonsHeader />
    <div :class="['flex gap-10', summerCatalog.length ? '' : 'justify-center']">
      <SummerList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

import SummerList from "@/features/use-product/ui/season/summer/SummerList.vue";
import SeasonsHeader from "@/features/use-product/ui/season/header-catalog/SeasonsHeader.vue";

const { getFavoriteProducts } = useGetFavorite();
const { getSeasonal, summerCatalog } = useGetProduct();

onMounted(async () => {
  await getSeasonal('Summer');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>