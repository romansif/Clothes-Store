<template>
  <div class="relative">
    <router-link :to="{ name: 'product/info', params: { id: product.productId } }">
      <img :src="productPreview(product.id, array)" alt=""
           :class="productPreviewClass(size, product)">
      <span v-if="isOutOfStack(product)" class="absolute top-45 -left-5 text-6xl font-semibold -rotate-50 w-90">
        Out Of Stack
      </span>
    </router-link>
    <img @click="toggleToFavorite(product.productId, 'favorite', product.productId)"
         :src="isFavorite(product.productId, userData.id) ? liked : like" alt=""
         class="absolute top-0.5 left-75.5 w-8 cursor-pointer">
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useFavorite } from "@/features/use-favorite/lib/use-favorite.ts";
import { productHelper } from "@/features/use-product/lib/product.helper.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

defineProps<{
  product: Product,
  array: Product[],
  size: string,
}>();

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";

const { userData } = userStore();
const { isFavorite } = useFavorite();
const { productPreviewClass } = baseClasses();
const { toggleToFavorite } = useToggleFavorite();
const { isOutOfStack, productPreview } = productHelper();
</script>

<style scoped>

</style>