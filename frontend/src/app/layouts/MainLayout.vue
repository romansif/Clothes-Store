<template>
<router-view />
</template>

<script setup lang="ts">
const { loading } = useBaseModals();
const { componentError } = errorHandler();
const { getCartProducts } = cartApi();
const { getFavoriteProducts } = favoritesApi();
const { product, activeProductImg } = productStore();
const { productInfoPreview } = productsCover();
const { getAllProducts, getFilteredProducts, getNewCollections, getWeekProducts, getYearProducts, getProduct } = productApi();

import { onErrorCaptured, onMounted } from "vue";
import { cartApi } from "@/features/use-cart/api/cart.api.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { favoritesApi } from "@/features/use-favorite/api/favorites.api.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { productsCover } from "@/features/use-product/model/product-cover.ts";

onErrorCaptured((err, info) => {
  console.error("Перехвачена ошибка в дочернем компоненте:", err);
  console.log("Детали ошибки:", info);

  componentError.value = "An error occurred while displaying the product catalog."

  return false
});

onMounted(async () => {
  loading.value = true;

  await getAllProducts();
  await getFilteredProducts('ALL', 'ALL');

  await getWeekProducts('ALL', 'ALL');
  await getYearProducts('ALL', 'ALL');

  await getNewCollections('ALL');

  await getCartProducts();
  await getFavoriteProducts();

  await getProduct();

  if(product.value && Array.isArray(product.value.images) && product.value.images[0]) {
    activeProductImg.value = productInfoPreview(product.value) ?? '';
  }

  loading.value = false;
});
</script>

<style scoped>

</style>