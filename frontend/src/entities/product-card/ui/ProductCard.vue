<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col w-fit">
      <ProductPreview :user="user"
                      :product="product"
                      :array="array"
                      :variant="variant"
                      @toggle-to-favorite="emit('toggleToFavorite', product)" />
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

const props = defineProps<{
  user: User | null;
  product: Product;
  array: Product[];
  variant: ProductCardVariant;
}>();

const emit = defineEmits<{
  toggleToFavorite: [product: Product],
}>()

</script>
