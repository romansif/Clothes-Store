<template>
  <Transition name="view" mode="out-in">
    <Loader v-if="isLoading" variant="year-list" />
    <ErrorState v-else-if="isError" variant="year-list" :loading="isFetching" @reload="refetch()" />
    <TransitionGroup
      name="list"
      tag="ul"
      v-else-if="yearProducts.length"
      v-horizontal-scroll
      class="no-scrollbar mt-10 flex gap-10 overflow-x-auto whitespace-nowrap xl:gap-40"
    >
      <ProductCard
        v-for="product in yearProducts"
        :user="props.user"
        :product="product"
        :array="yearProducts"
        :favorite="favorite"
        :variant="'year'"
        @toggle-to-favorite="toggleFavorite({ favorite, product })"
      />
    </TransitionGroup>
    <EmptyState v-else variant="year-list" :loading="isFetching" @reload="refetch()" />
  </Transition>
</template>

<script setup lang="ts">
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useYearProductData } from "@/widgets/year-list/lib/use-year-product-data";
import { useFavoriteData } from "@/shared/lib/use-favorite-data";
import { vHorizontalScroll} from "@/shared/lib/horizontal-scroll";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
const { yearProducts, isLoading, isFetching, isError, refetch } = useYearProductData("ALL", "ALL");

const props = defineProps<{
  user: User | undefined;
}>();
</script>
