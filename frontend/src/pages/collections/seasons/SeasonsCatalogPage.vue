<template>
  <main class="flex flex-col gap-6 mt-14">
    <HeaderCatalog />
    <div class="flex gap-10">
      <SeasonsCatalog />
    </div>
  </main>
</template>

<script setup lang="ts">
import HeaderCatalog from "@/features/use-product/ui/season/header-catalog/HeaderCatalog.vue";
import SeasonsCatalog from "@/features/use-product/ui/season/SeasonsCatalog.vue";
</script>

<style scoped>

</style>