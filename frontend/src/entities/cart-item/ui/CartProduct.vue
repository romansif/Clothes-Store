<template>
  <li :key="props.product.id" class="flex gap-5">
    <div class="flex flex-col">
      <ProductPreview
        :user="props.user"
        :product="props.product"
        :array="props.cart"
        :favorite="props.favorite"
        :variant="'main&favorite&Cart'"
        @toggle-to-favorite="emit('toggleToFavorite', props.favorite, props.product)"
      />
      <span class="mt-2 text-sm whitespace-normal text-[#A3A3A3] sm:text-lg">
        {{ props.product.material }} {{ props.product.category }}
      </span>
      <div class="flex items-center justify-between text-sm font-medium sm:text-lg">
        <span class="whitespace-normal">
          {{ props.product.title }}
        </span>
        <span class="font-dm-sans"> $ {{ props.product.price }} </span>
      </div>
    </div>
    <slot />
  </li>
</template>

<script setup lang="ts">
import { ProductPreview } from "@/shared/ui/product-card";
import type { CartItem } from "@/shared/model";
import type { Product } from "@/shared/model";
import type { User } from "@/shared/model";
import type { FavoriteItem } from "@/shared/model";

const props = defineProps<{
  user: User | undefined;
  product: Product;
  cart: CartItem[];
  favorite: FavoriteItem[];
}>();

const emit = defineEmits<{
  toggleToFavorite: [favorite: FavoriteItem[], product: Product];
}>();
</script>
