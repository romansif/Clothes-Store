<template>
  <main class="flex flex-col gap-6 mt-10">
    <HeaderCatalog />
    <div class="flex gap-10">
      <SeasonsCatalog />
    </div>
  </main>
</template>

<script setup lang="ts">
import { HeaderCatalog } from "@/widgets/ui/navigation";
import { SeasonsCatalog } from "@/features/use-season-product";
</script>
