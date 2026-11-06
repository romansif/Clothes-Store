<template>
  <template v-if="product">
    <div class="relative">
      <router-link :to="{ name: 'product/info', params: { id: getProductId(props.product) } }">
        <img
          :src="productPreview(props.product.id, array)"
          alt=""
          :class="productPreviewClass(productCardVariants[props.variant].size, props.product)"
        />
        <span v-if="isOutOfStack(props.product)" :class="productCardVariants[props.variant].stack">{{ t('product.outOfStock') }}</span>
      </router-link>
      <img
        v-if="user?.role === 'Buyer'"
        :src="isFavorite(props.favorite, props.product, props.user?.id) ? liked : like"
        alt=""
        :class="productCardVariants[props.variant].button"
        @click="emit('toggleToFavorite', props.favorite, props.product)"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { productPreviewClass } from "@/shared/model/product-preview.variants";
import { productCardVariants } from "@/entities/product-card/model/product-card.variants";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { ProductCardVariant } from "@/entities/product-card";
import type { FavoriteItem } from "@/entities/favorite-item";

import liked from "@/assets/icons/nav/liked.png";
import like from "@/assets/icons/nav/like.png";

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

const { t } = useI18n()
const { getProductId, isOutOfStack, productPreview, isFavorite } = previewHelper();
</script>
