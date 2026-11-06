<template>
  <Transition name="view" mode="out-in">
    <Loader v-if="isLoading" variant="week-list" />
    <ErrorState v-else-if="isError" variant="week-list" :loading="isFetching" @reload="refetch()" />
    <TransitionGroup
      name="list"
      tag="ul"
      v-else-if="weekProducts.length"
      v-horizontal-scroll
      class="no-scrollbar flex gap-10 overflow-x-auto pt-6 whitespace-nowrap xl:gap-22.5"
    >
      <ProductCard
        v-for="product in weekProducts"
        :user="props.user"
        :product="product"
        :array="weekProducts"
        :favorite="favorite"
        :variant="'week'"
        @toggle-to-favorite="toggleFavorite({ favorite, product })"
      />
    </TransitionGroup>
    <EmptyState v-else variant="week-list" :loading="isFetching" @reload="refetch()" />
  </Transition>
</template>

<script setup lang="ts">
import { useWeekProductData } from "@/widgets/week-list/lib/use-week-product-data";
import { useFavoriteData } from "@/shared/lib/use-favorite-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { vHorizontalScroll} from "@/shared/lib/horizontal-scroll";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
const { weekProducts, isLoading, isFetching, isError, refetch } = useWeekProductData("ALL", "ALL");

const props = defineProps<{
  user: User | undefined;
}>();
</script>
