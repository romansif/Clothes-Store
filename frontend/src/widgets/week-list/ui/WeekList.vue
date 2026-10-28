<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-10 xl:gap-22.5 overflow-x-auto whitespace-nowrap no-scrollbar pt-6">
      <ProductCard v-for="product in weekProducts"
                   :user="user"
                   :product="product"
                   :array="weekProducts"
                   :favorite="favorite"
                   :variant="'week'"
                   @toggle-to-favorite="toggleFavorite({favorite, product})" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { useWeekProductData } from "@/widgets/week-list/lib/use-week-product-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { productsHelper } from "@/features/products/lib/products-helper";
import { ProductCard } from "@/entities/product-card";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData()
const { toggleFavorite } = useToggleFavorite()
const { vHorizontalScroll } = productsHelper();
const { weekProducts } = useWeekProductData('ALL', 'ALL')

const props = defineProps<{
  user: User | undefined
}>()
</script>
