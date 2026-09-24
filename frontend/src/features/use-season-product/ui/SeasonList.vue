<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-16.5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <ProductCard v-for="product in array"
                   :user="userData"
                   :product="product"
                   :array="array"
                   :variant="'season'"
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