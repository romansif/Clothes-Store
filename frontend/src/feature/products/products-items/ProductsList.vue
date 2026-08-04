<script setup lang="ts">
import ProductsCard from "./ProductsCard.vue";
</script>

<template>
  <ul class="font-[Montserrat] grid grid-cols-2 gap-5 overflow-y-auto max-h-[530px]
     sm:max-h-[790px] sm:grid-cols-2 no-scrollbar sm:gap-8 md:gap-10 md:max-h-[800px] lg:grid-cols-3 xl:max-h-[456px]">
    <ProductsCard />
  </ul>
</template>

<style scoped>

</style>