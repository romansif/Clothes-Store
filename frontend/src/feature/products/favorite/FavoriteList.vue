<script setup lang="ts">
  import FavoriteCard from "./FavoriteCard.vue";
</script>

<template>
  <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-[580px] no-scrollbar sm:gap-5 sm:h-[580px] sm:grid sm:grid-cols-2
      md:w-full md:grid md:grid-cols-2 md:gap-x-30 md:gap-y-15 lg:h-[570px] lg:grid-cols-3 lg:gap-15
      xl:grid-cols-3 xl:gap-30 xl:w-full xl:h-[470px]">
    <FavoriteCard />
  </ul>
</template>

<style scoped>

</style>