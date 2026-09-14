<template>
  <main class="flex flex-col gap-6 mt-10">
    <HeaderCatalog />
    <div class="flex gap-10">
      <SeasonsCatalog />
    </div>
  </main>
</template>

<script setup lang="ts">
import HeaderCatalog from "@/features/use-season-product/ui/header-catalog/HeaderCatalog.vue";
import SeasonsCatalog from "@/features/use-season-product/ui/SeasonsCatalog.vue";
</script>

<style scoped>

</style>