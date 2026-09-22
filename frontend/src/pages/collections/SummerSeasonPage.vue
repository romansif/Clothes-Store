<template>
  <main class="flex flex-col mt-10">
    <SeasonsHeader />
    <div :class="['flex gap-10', summerCatalog.length ? '' : 'justify-center']">
      <SummerList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";

import SummerList from "@/features/use-season-product/ui/SummerList.vue";
import SeasonsHeader from "@/widgets/ui/navigation/SeasonsHeader.vue";

const { summerCatalog } = useGetSeasonProducts();
</script>

<style scoped>

</style>