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
import { userStore } from "@/features/use-profile/model/user.store";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite";
import { productsHelper } from "@/features/use-main-product/lib/products-helper";
import { useGetWeekProduct } from "@/features/use-week-product/api/get-week-product";

import { ProductCard } from "@/entities/product-card";

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
