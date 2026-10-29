<template>
  <Transition name="view" mode="out-in">
    <Loader v-if="isLoading" variant="products" />
    <ErrorState v-else-if="isError" variant="products"/>
    <ul v-else-if="filteredProducts.length"
        class="font-raleway grid grid-cols-2 gap-5 overflow-y-auto max-h-132.5
        sm:max-h-197.5 sm:grid-cols-2 no-scrollbar sm:gap-8 md:gap-10 md:max-h-200 lg:grid-cols-3 xl:max-h-116 mt-5 xl:mt-0">
      <ProductCard v-for="product in filteredProducts"
                   :user="user"
                   :product="product"
                   :array="filteredProducts"
                   :favorite="favorite"
                   :variant="'main&favorite&Cart'"
                   @toggle-to-favorite="toggleFavorite({favorite, product})" />
    </ul>
    <EmptyState v-else variant="products" />
  </Transition>
</template>

<script setup lang="ts">
import { useProductListData } from "@/widgets/product-list/lib/use-product-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData()
const { toggleFavorite } = useToggleFavorite()
const { filteredProducts, isLoading, isError } = useProductListData()

const props = defineProps<{
  user: User | undefined
}>()
</script>
