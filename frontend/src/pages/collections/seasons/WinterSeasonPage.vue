<template>
  <main class="flex flex-col mt-14">
    <SeasonsHeader />
    <div :class="['flex gap-10', winterCatalog.length ? '' : 'justify-center']">
      <WinterList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

import SeasonsHeader from "@/features/use-all-product/ui/season/header-catalog/SeasonsHeader.vue";
import WinterList from "@/features/use-all-product/ui/season/winter/WinterList.vue";

const { getFavoriteProducts } = useGetFavorite();
const { getSeasonal, winterCatalog } = useGetProduct();

onMounted(async () => {
  await getSeasonal('Winter');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>