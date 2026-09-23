<template>
  <main class="flex flex-col mt-10">
    <SeasonsHeader />
    <div :class="['flex gap-10', winterCatalog.length ? '' : 'justify-center']">
      <SeasonList :array="winterCatalog"
                  season="Winter" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";

import SeasonsHeader from "@/widgets/ui/navigation/SeasonsHeader.vue";
import SeasonList from "@/features/use-season-product/ui/SeasonList.vue";

const { winterCatalog } = useGetSeasonProducts();
</script>

<style scoped>

</style>