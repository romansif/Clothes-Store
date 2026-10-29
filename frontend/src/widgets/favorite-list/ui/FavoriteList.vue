<template>
  <Transition name="view" mode="out-in">
    <Loader v-if="isLoading" variant="favorite" />
    <ErrorState v-else-if="isError" variant="favorite" />
    <ul v-else-if="favorite.length"
        class="flex flex-col overflow-y-auto gap-10 h-145 no-scrollbar sm:gap-5 sm:h-145 sm:grid sm:grid-cols-2
        md:w-full md:grid md:grid-cols-2 md:gap-x-30 md:gap-y-15 lg:h-142.5 lg:grid-cols-3 lg:gap-15
        xl:grid-cols-3 xl:gap-30 xl:w-full xl:h-117.5">
      <ProductCard v-for="product in favorite"
                   :key="product.id"
                   :user="user"
                   :product="product"
                   :array="favorite"
                   :favorite="favorite"
                   :variant="'main&favorite&Cart'"
                   @toggle-to-favorite="toggleFavorite({ favorite, product })" />
    </ul>
    <EmptyState v-else variant="favorite" />
  </Transition>
</template>

<script setup lang="ts">
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite, isLoading, isError } = useFavoriteData()
const { toggleFavorite } = useToggleFavorite()

const props = defineProps<{
  user: User | undefined
}>()
</script>
