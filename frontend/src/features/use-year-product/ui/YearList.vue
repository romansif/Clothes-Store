<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar">
      <ProductCard v-for="product in productsYear"
                   :user="userData"
                   :product="product"
                   :array="productsYear"
                   :variant="'year'"
                   @toggle-to-favorite="toggleToFavorite"/>
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "@/features/use-profile/model/user.store";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite";
import { useGetYearProduct } from "@/features/use-year-product/api/get-year-product";
import { productsHelper } from "@/features/use-main-product/lib/products-helper";

import { ProductCard } from "@/entities/product-card";

const { userData } = userStore();
const { vHorizontalScroll } = productsHelper();
const { toggleToFavorite } = useToggleFavorite();
const { getFavoriteProducts } = useGetFavorite();
const { getYearProducts, productsYear } = useGetYearProduct();

onMounted(async() => {
  await getFavoriteProducts();
  await getYearProducts('ALL', 'ALL')
})
</script>
