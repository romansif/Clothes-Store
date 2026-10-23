<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-16.5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <ProductCard v-for="product in array"
                   :key="product.id"
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
import { userStore } from "@/shared/model/user.store";
import { useGetFavorite } from "@/shared/api/get-favorite";
import { productsHelper } from "@/features/products/lib/products-helper";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useGetSeasonProducts } from "@/widgets/season-list/api/get-season-product";
import type { Product } from "@/shared";

const props = defineProps<{
  array: Product[];
  season: string;
}>();

import ProductCard from "../../../entities/product-card/ui/ProductCard.vue";

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
