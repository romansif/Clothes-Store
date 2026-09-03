<template>
<router-view :key="product?.id" />
</template>

<script setup lang="ts">
const { getProduct } = productApi();
const { loading } = useBaseModals();
const { getCartProducts } = cartApi();
const { componentError } = errorHandler();
const { getFavoriteProducts } = favoritesApi();
const { product, activeProductImg } = productStore();
const { productInfoPreview } = productsCover();
const { getAllProducts, getFilteredProducts, getSeasonal, getWeekProducts, getYearProducts } = productApi();

import { useRoute } from "vue-router";
import { watch } from "vue";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { cartApi } from "@/features/use-cart/api/cart.api.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { favoritesApi } from "@/features/use-favorite/api/favorites.api.ts";
import { productsCover } from "@/features/use-product/model/use-product.ts";

const route = useRoute();

const load = async () => {
  loading.value = true;

  try {
    await getAllProducts();
    await getFilteredProducts('ALL', 'ALL');
    await getWeekProducts('ALL', 'ALL');
    await getYearProducts('ALL', 'ALL');
    await getSeasonal('ALL');
    await getCartProducts();
    await getFavoriteProducts();

    const id = route.params.id as string | undefined;
    if (id) {
      await getProduct(id);
      activeProductImg.value = product.value?.images?.[0] ? productInfoPreview(product.value) ?? '' : '';
    }
  } catch (err) {
    console.error('Ошибка загрузки данных страницы:', err);
    componentError.value = 'An error occurred while displaying the product catalog.';
  }

  loading.value = false;
};

watch(
    () => [route.name, route.params.id],
    load,
    { immediate: true }
);
</script>

<style scoped>

</style>