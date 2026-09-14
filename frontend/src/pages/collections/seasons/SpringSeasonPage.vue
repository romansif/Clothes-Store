<template>
  <main class="flex flex-col mt-14">
    <SeasonsHeader />
    <div :class="['flex gap-10', springCatalog.length ? '' : 'justify-center']">
      <SpringList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";

import SeasonsHeader from "@/features/use-season-product/ui/header-catalog/SeasonsHeader.vue";
import SpringList from "@/features/use-season-product/ui/spring/SpringList.vue";

const { springCatalog } = useGetSeasonProducts();
</script>

<style scoped>

</style>