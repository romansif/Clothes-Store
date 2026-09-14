<template>
  <Transition name="view">
    <div v-if="winterCatalog.length === 0" class="pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">The seasonal selections is coming soon</span>
      </div>
    </div>
    <ul v-horizontal-scroll v-else class="flex gap-16.5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <WinterItem v-for="product in winterCatalog" :product="product" :winter-catalog="winterCatalog" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProducts } from "@/features/use-main-product/api/get-product.ts";
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";

import empty_products from "@/assets/icons/products/icon-products.svg";
import WinterItem from "@/features/use-season-product/ui/winter/WinterItem.vue";

const { vHorizontalScroll } = useGetProducts();
const { getFavoriteProducts } = useGetFavorite();
const { getSeasonal, winterCatalog } = useGetSeasonProducts();

onMounted(async () => {
  await getSeasonal('Autumn');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>