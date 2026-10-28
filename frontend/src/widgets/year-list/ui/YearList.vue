<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar">
      <ProductCard v-for="product in yearProducts"
                   :user="user"
                   :product="product"
                   :array="yearProducts"
                   :favorite="favorite"
                   :variant="'year'"
                   @toggle-to-favorite="toggleFavorite({favorite, product})"/>
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useYearProductData } from "@/widgets/year-list/lib/use-year-product-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { productsHelper } from "@/features/products/lib/products-helper";
import { ProductCard } from "@/entities/product-card";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData()
const { toggleFavorite } = useToggleFavorite()
const { vHorizontalScroll } = productsHelper();
const { yearProducts } = useYearProductData('ALL', 'ALL');

const props = defineProps<{
  user: User | undefined
}>()
</script>
