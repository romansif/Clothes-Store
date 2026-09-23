<template>
  <Transition name="view">
    <div v-if="products.length === 0" class="flex justify-center pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">The products in this category is coming soon</span>
      </div>
    </div>
    <ul v-else class="font-raleway grid grid-cols-2 gap-5 overflow-y-auto max-h-132.5
       sm:max-h-197.5 sm:grid-cols-2 no-scrollbar sm:gap-8 md:gap-10 md:max-h-200 lg:grid-cols-3 xl:max-h-116 mt-5 xl:mt-0">
      <ProductCard v-for="product in products"
                   :user="userData"
                   :product="product"
                   :array="products"
                   :variant="'main&favorite&Cart'"
                   @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProducts } from "@/features/use-main-product/api/get-product.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";

import empty_products from "@/assets/icons/products/icon-products.svg";
import ProductCard from "@/entities/product-card/ui/ProductCard.vue";

const { userData } = userStore();
const { getFavoriteProducts } = useGetFavorite();
const { toggleToFavorite } = useToggleFavorite();
const { getAllProducts, getFilteredProducts, products } = useGetProducts();

onMounted(async() => {
  await getAllProducts();
  await getFilteredProducts('ALL', 'ALL');
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>