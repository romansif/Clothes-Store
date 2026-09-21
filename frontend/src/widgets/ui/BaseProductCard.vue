<template>
  <template v-if="product">
    <div class="relative">
      <router-link :to="{ name: 'product/info', params: { id: getProductId(product) } }">
        <img :src="productPreview(product.id, array)" alt=""
             :class="productPreviewClass(size, product)">
        <span v-if="isOutOfStack(product)"
              :class="stackClass">
          Out Of Stack
        </span>
      </router-link>
      <img @click="toggleToFavorite(product)"
           :src="isFavorite(product) ? liked : like" alt=""
           :class="favoriteBtn">
    </div>
  </template>
</template>

<script setup lang="ts">
import { useFavorite } from "@/features/use-favorite/lib/use-favorite.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import type {Product} from "@/entities/product/model/product.types.ts";

defineProps<{
  product: Product,
  array: Product[],
  size: string,
  stackClass: string,
  favoriteBtn: string,
}>();

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";

const { isFavorite } = useFavorite();
const { getProductId } = useGetProduct();
const { productPreviewClass } = baseClasses();
const { toggleToFavorite } = useToggleFavorite();
const { isOutOfStack, productPreview } = productHelper();
</script>

<style scoped>

</style>