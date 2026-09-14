<template>
  <main class="flex flex-col mt-14">
    <SeasonsHeader />
    <div :class="['flex gap-10', autumnCatalog.length ? '' : 'justify-center']">
      <AutumnList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";

import SeasonsHeader from "@/features/use-season-product/ui/header-catalog/SeasonsHeader.vue";
import AutumnList from "@/features/use-season-product/ui/autumn/AutumnList.vue";

const { autumnCatalog } = useGetSeasonProducts();
</script>

<style scoped>

</style>