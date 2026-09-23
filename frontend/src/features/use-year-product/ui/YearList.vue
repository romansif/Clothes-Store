<template>
  <Transition name="view">
    <div v-if="productsYear.length === 0" class="flex justify-center mt-15 mb-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">At of now, year collection have not yet appeared</span>
      </div>
    </div>
    <ul v-else v-horizontal-scroll class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar">
      <ProductCard v-for="product in productsYear"
                :user="userData"
                :product="product"
                :array="productsYear"
                :size="'w-full h-50 md:h-70 lg:h-105'"
                :stack-class="'absolute top-45 -left-10 text-7xl font-semibold -rotate-50 w-110'"
                :favorite-btn="'absolute top-0.5 left-79.5 w-8 cursor-pointer'"
                @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetYearProduct } from "@/features/use-year-product/api/get-year-product.ts";
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";

import empty_products from "@/assets/icons/products/icon-products.svg";
import ProductCard from "@/entities/product-card/ui/ProductCard.vue";

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


<style scoped>

</style>