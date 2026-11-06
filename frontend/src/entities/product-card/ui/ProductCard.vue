<template>
  <li :key="product.id" class="flex w-fit flex-col">
    <ProductPreview
      :user="props.user"
      :product="props.product"
      :array="props.array"
      :favorite="props.favorite"
      :variant="props.variant"
      @toggle-to-favorite="emit('toggleToFavorite', props.favorite, props.product)"
    />
    <span class="mt-2 text-lg whitespace-normal text-[#A3A3A3]"> {{ props.product.material }} {{ props.product.category }} </span>
    <div class="flex items-center justify-between text-lg font-medium">
      <span class="whitespace-normal">
        {{ props.product.title }}
      </span>
      <span class="font-dm-sans"> $ {{ props.product.price }} </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ProductPreview } from "@/entities/product-card";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { ProductCardVariant } from "@/entities/product-card";
import type { FavoriteItem } from "@/entities/favorite-item";

const props = defineProps<{
  user: User | undefined;
  product: Product;
  array: Product[];
  favorite: FavoriteItem[];
  variant: ProductCardVariant;
}>();

const emit = defineEmits<{
  toggleToFavorite: [favorite: FavoriteItem[], product: Product];
}>();
</script>
