<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col w-fit">
      <ProductPreview :user="user"
                      :product="product"
                      :array="array"
                      :favorite="favorite"
                      :variant="variant"
                      @toggle-to-favorite="emit('toggleToFavorite', favorite, product)" />
      <span class="whitespace-normal mt-2 text-[#A3A3A3] text-lg">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex justify-between items-center font-medium text-lg">
        <span class="whitespace-normal">
          {{ product.title }}
        </span>
        <span class="font-dm-sans">
          $ {{ product.price }}
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ProductPreview } from "@/entities/product-card";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { ProductCardVariant } from "@/entities/product-card";
import type { FavoriteItem } from "@/entities/favroite-item";

const props = defineProps<{
  user: User | undefined;
  product: Product;
  array: Product[];
  favorite: FavoriteItem[]
  variant: ProductCardVariant;
}>();

const emit = defineEmits<{
  toggleToFavorite: [favorite: FavoriteItem[], product: Product],
}>()
</script>
