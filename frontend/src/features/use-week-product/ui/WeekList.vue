<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-10 xl:gap-22.5 overflow-x-auto whitespace-nowrap no-scrollbar pt-6">
      <ProductCard v-for="product in productsWeek"
                   :user="userData"
                   :product="product"
                   :array="productsWeek"
                   :variant="'week'"
                   @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";
import { useGetWeekProduct } from "@/features/use-week-product/api/get-week-product.ts";

import ProductCard from "@/entities/product-card/ui/ProductCard.vue";

const { userData } = userStore();
const { vHorizontalScroll } = productsHelper();
const { toggleToFavorite } = useToggleFavorite();
const { getFavoriteProducts } = useGetFavorite();
const { getWeekProducts, productsWeek } = useGetWeekProduct();

onMounted(async() => {
  await getFavoriteProducts();
  await getWeekProducts('ALL', 'ALL')
})
</script>

<style scoped>

</style>