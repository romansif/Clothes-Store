<template>
  <template v-if="product">
    <div class="relative">
      <router-link :to="{ name: 'product/info', params: { id: getProductId(product) } }">
        <img :src="productPreview(product.id, array)" alt=""
             :class="productPreviewClass(classes.size, product)">
        <span v-if="isOutOfStack(product)"
              :class="classes.stack">
          Out Of Stack
        </span>
      </router-link>
      <img v-if="user" :src="isFavorite(product, user) ? liked : like" alt=""
           :class="classes.button"
           @click="toggleToFavorite(product)">
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { previewHelper } from "@/entities/product-card/lib/preview-helper.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";
import type {Product} from "@/shared/model/product.types.ts";
import type {User} from "@/entities/profile/model/user.types.ts";
import type {ProductCardVariant} from "@/entities/product-card/model/product.class.types.ts";
import { productCardVariants } from "@/entities/product-card/config/product-card.variants.ts";

const props = defineProps<{
  user: User | null;
  product: Product;
  array: Product[];
  variant: ProductCardVariant;
}>();

const emit = defineEmits<{
  toggleToFavorite: [product: Product],
}>()

const toggleToFavorite = (product: Product) => {
  emit("toggleToFavorite", product)
}

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";

const { productPreviewClass } = baseClasses();
const { getProductId, isOutOfStack, productPreview, isFavorite } = previewHelper();

const classes = computed(() => {
  return productCardVariants[props.variant];
});
</script>

<style scoped>

</style>