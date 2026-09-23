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
      <img v-if="user" :src="isFavorite(product, user) ? liked : like" alt=""
           :class="favoriteBtn"
           @click="toggleToFavorite(product)">
    </div>
  </template>
</template>

<script setup lang="ts">
import { previewHelper } from "@/entities/product-card/lib/preview-helper.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";
import type {Product} from "@/shared/model/product.types.ts";

defineProps<{
  user: User | null
  product: Product,
  array: Product[],
  size: string,
  stackClass: string,
  favoriteBtn: string,
}>();

const emit = defineEmits<{
  toggleToFavorite: [product: Product],
}>()

const toggleToFavorite = (product: Product) => {
  emit("toggleToFavorite", product)
}

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";
import type {User} from "@/entities/profile/model/user.types.ts";

const { productPreviewClass } = baseClasses();
const { getProductId, isOutOfStack, productPreview, isFavorite } = previewHelper();
</script>

<style scoped>

</style>