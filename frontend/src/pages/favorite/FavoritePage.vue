<template>
  <main class="flex flex-col gap-8 t-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <FavoriteList />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/shared/api/get-favorite";

import { FavoriteCartHeader } from "@/widgets/favorite-cart-header";
import { FavoriteList } from "@/widgets/favorite-list";

const { getFavoriteProducts } = useGetFavorite();

onMounted(async() => {
  await getFavoriteProducts();
})
</script>
