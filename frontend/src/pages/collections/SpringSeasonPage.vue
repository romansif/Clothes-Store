<template>
  <main class="flex flex-col mt-10">
    <SeasonsHeader />
    <div :class="['flex gap-10', springCatalog.length ? '' : 'justify-center']">
      <SpringList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";

import SeasonsHeader from "@/entities/season-product/ui/SeasonsHeader.vue";
import SpringList from "@/features/use-season-product/ui/SpringList.vue";

const { springCatalog } = useGetSeasonProducts();
</script>

<style scoped>

</style>