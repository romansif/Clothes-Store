<template>
  <TransitionGroup
    name="list"
    tag="ul"
    v-horizontal-scroll
    class="no-scrollbar mt-5 flex gap-16.5 overflow-x-auto pt-5 whitespace-nowrap"
  >
    <ProductCard
      v-for="product in props.array"
      :key="product.id"
      :user="props.user"
      :product="product"
      :array="array"
      :favorite="favorite"
      :variant="props.variant"
      @toggle-to-favorite="toggleFavorite({ favorite, product })"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { vHorizontalScroll } from "@/shared/lib/horizontal-scroll";
import { useFavoriteData } from "@/shared/lib";
import { useToggleFavorite } from "@/shared/api";
import { ProductCard } from "@/shared/ui/product-card";
import type { ProductCardVariant } from "@/shared/ui/product-card";
import type { Product } from "@/shared/model";
import type { User } from "@/shared/model";

const props = defineProps<{
  user: User | undefined;
  array: Product[];
  variant: ProductCardVariant;
}>();

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
</script>
