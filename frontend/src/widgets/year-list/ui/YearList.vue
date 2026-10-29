<template>
  <Transition name="view" mode="out-in">
    <Loading v-if="isPending" />
    <ErrorState v-else-if="isError" :box="{ variant: 'year-list', state: 'error' }" />
    <ul v-else-if="yearProducts.length" v-horizontal-scroll
        class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar mt-10">
      <ProductCard v-for="product in yearProducts"
                   :user="user"
                   :product="product"
                   :array="yearProducts"
                   :favorite="favorite"
                   :variant="'year'"
                   @toggle-to-favorite="toggleFavorite({favorite, product})"/>
    </ul>
    <EmptyState v-else :box="{ variant: 'year-list', state: 'empty' }" />
  </Transition>
</template>

<script setup lang="ts">
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useYearProductData } from "@/widgets/year-list/lib/use-year-product-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { productsHelper } from "@/features/products/lib/products-helper";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loading } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData()
const { toggleFavorite } = useToggleFavorite()
const { vHorizontalScroll } = productsHelper();
const { yearProducts, isPending, isError } = useYearProductData('ALL', 'ALL');

const props = defineProps<{
  user: User | undefined
}>()
</script>
