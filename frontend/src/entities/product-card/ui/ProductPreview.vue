<template>
  <template v-if="product">
    <div class="relative">
      <router-link :to="{ name: 'product/info', params: { id: getProductId(product) } }">
        <img :src="productPreview(product.id, array)" alt=""
             :class="productPreviewClass(productCardVariants[props.variant].size, product)">
        <span v-if="isOutOfStack(product)"
              :class="productCardVariants[props.variant].stack">
          Out Of Stack
        </span>
      </router-link>
      <img v-if="user" :src="isFavorite(product, user) ? liked : like" alt=""
           :class="productCardVariants[props.variant].button"
           @click="emit('toggleToFavorite', product)">
    </div>
  </template>
</template>

<script setup lang="ts">
import { previewHelper } from "@/entities/product-card/lib/preview-helper.ts";
import { productPreviewClass } from "@/shared/model/product-preview.variants.ts";
import { productCardVariants } from "@/entities/product-card/config/product-card.variants.ts";
import type { Product } from "@/shared/model/product.types.ts";
import type { User } from "@/entities/profile/model/user.types.ts";
import type { ProductCardVariant } from "@/entities/product-card/model/product-card.types.ts";

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";

const props = defineProps<{
  user: User | null;
  product: Product;
  array: Product[];
  variant: ProductCardVariant;
}>();

const emit = defineEmits<{
  toggleToFavorite: [product: Product],
}>()

const { getProductId, isOutOfStack, productPreview, isFavorite } = previewHelper();
</script>
