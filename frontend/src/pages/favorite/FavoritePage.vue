<template>
  <main class="mt-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <FavoriteList />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";

import FavoriteCartHeader from "@/widgets/ui/navigation/FavoriteCartHeader.vue";
import FavoriteList from "@/features/use-favorite/ui/FavoriteList.vue";

const { getFavoriteProducts } = useGetFavorite();

onMounted(async() => {
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>