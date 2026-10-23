<template>
  <main class="flex flex-col mt-10">
    <SeasonsHeader />
    <div :class="['flex gap-10', summerCatalog.length ? '' : 'justify-center']">
      <SeasonList :array="summerCatalog"
                  season="Summer" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetSeasonProducts } from "@/widgets/season-list/api/get-season-product";
import { SeasonsHeader } from "@/widgets/navigation";
import { SeasonList } from "@/widgets/season-list";

const { summerCatalog } = useGetSeasonProducts();
</script>

