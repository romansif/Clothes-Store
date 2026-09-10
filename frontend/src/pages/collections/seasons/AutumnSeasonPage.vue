<template>
  <main class="flex flex-col mt-14">
    <SeasonsHeader />
    <div :class="['flex gap-10', autumnCatalog.length ? '' : 'justify-center']">
      <AutumnList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

import SeasonsHeader from "@/features/use-product/ui/season/header-catalog/SeasonsHeader.vue";
import AutumnList from "@/features/use-product/ui/season/autumn/AutumnList.vue";

const { getFavoriteProducts } = useGetFavorite();
const { getSeasonal, autumnCatalog } = useGetProduct();

onMounted(async () => {
  await getSeasonal('Autumn');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>