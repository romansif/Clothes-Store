<template>
  <main class="mt-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <FavoriteList />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import FavoriteCartHeader from "@/widgets/ui/navigation/FavoriteCartHeader.vue";
import FavoriteList from "@/features/use-favorite/ui/FavoriteList.vue";
</script>

<style scoped>

</style>