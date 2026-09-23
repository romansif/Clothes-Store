<template>
  <Transition name="view">
    <div v-if="array.length === 0" class="pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">The seasonal selections is coming soon</span>
      </div>
    </div>
    <ul v-horizontal-scroll v-else class="flex gap-16.5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <ProductCard v-for="product in array"
                   :user="userData"
                   :product="product"
                   :array="array"
                   :size="'w-83.75 h-45 sm:h-78.5 xl:h-95'"
                   :stack-class="'absolute top-35 -left-6 text-6xl font-semibold -rotate-50 w-110'"
                   :favorite-btn="'absolute top-0.5 left-75.5 w-8 cursor-pointer'"
                   @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { useGetSeasonProducts } from "@/features/use-season-product/api/get-season-product.ts";
import type {Product} from "@/shared/model/product.types.ts";

const props = defineProps<{
  array: Product[];
  season: string;
}>();

import empty_products from "@/assets/icons/products/icon-products.svg";
import ProductCard from "@/entities/product-card/ui/ProductCard.vue";

const { userData } = userStore();
const { vHorizontalScroll } = productsHelper();
const { toggleToFavorite } = useToggleFavorite();
const { getFavoriteProducts } = useGetFavorite();
const { getSeasonal } = useGetSeasonProducts();

onMounted(async () => {
  await getSeasonal(props.season);
  await getFavoriteProducts();
})
</script>

<style scoped>

</style>