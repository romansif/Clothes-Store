<template>
  <Transition name="view">
    <div v-if="productsWeek.length === 0" class="flex justify-center pt-20">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">At of now, week collection have not yet appeared</span>
      </div>
    </div>
    <ul v-else v-horizontal-scroll class="flex gap-10 xl:gap-22.5 overflow-x-auto whitespace-nowrap no-scrollbar pt-6">
      <WeekItem v-for="product in productsWeek" :product="product" :product-week="productsWeek" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";
import { useGetWeekProduct } from "@/features/use-week-product/api/get-week-product.ts";

import WeekItem from "@/entities/week-product/ui/WeekItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";

const { vHorizontalScroll } = productsHelper();
const { getFavoriteProducts } = useGetFavorite();
const { getWeekProducts, productsWeek } = useGetWeekProduct();

onMounted(async() => {
  await getFavoriteProducts();
  await getWeekProducts('ALL', 'ALL')
})
</script>

<style scoped>

</style>