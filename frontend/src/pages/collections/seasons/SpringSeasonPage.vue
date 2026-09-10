<template>
  <main class="flex flex-col mt-14">
    <SeasonsHeader />
    <div :class="['flex gap-10', springCatalog.length ? '' : 'justify-center']">
      <SpringList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

import SeasonsHeader from "@/features/use-product/ui/season/header-catalog/SeasonsHeader.vue";
import SpringList from "@/features/use-product/ui/season/spring/SpringList.vue";

const { getFavoriteProducts } = useGetFavorite();
const { getSeasonal, springCatalog } = useGetProduct();

onMounted(async () => {
  await getSeasonal('Spring');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>