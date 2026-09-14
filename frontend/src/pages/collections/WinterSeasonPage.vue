<template>
  <main class="flex flex-col mt-10">
    <SeasonsHeader />
    <div :class="['flex gap-10', winterCatalog.length ? '' : 'justify-center']">
      <WinterList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";

import SeasonsHeader from "@/features/use-season-product/ui/header-catalog/SeasonsHeader.vue";
import WinterList from "@/features/use-season-product/ui/winter/WinterList.vue";

const { winterCatalog } = useGetSeasonProducts();
</script>

<style scoped>

</style>