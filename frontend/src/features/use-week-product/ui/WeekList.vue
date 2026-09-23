<template>
  <Transition name="view">
    <div v-if="productsWeek.length === 0" class="flex justify-center pt-20">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">At of now, week collection have not yet appeared</span>
      </div>
    </div>
    <ul v-else v-horizontal-scroll class="flex gap-10 xl:gap-22.5 overflow-x-auto whitespace-nowrap no-scrollbar pt-6">
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

import empty_products from "@/assets/icons/products/icon-products.svg";
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