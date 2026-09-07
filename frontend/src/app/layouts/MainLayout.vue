<template>
<router-view :key="product?.id" />
</template>

<script setup lang="ts">
import {searchForm} from "@/widgets/navigation/model/search.form.ts";

const { loading } = useBaseModals();
const { getCartProducts } = useGetCart();
const { componentError } = errorHandler();
const { searchProductForm } = searchForm();
const { productInfoPreview } = productsCover();
const { getFavoriteProducts } = useGetFavorite();
const { products, seasonalSelections, product, activeProductImg } = productStore();
const { getProduct, getAllProducts, getFilteredProducts, getSeasonal,
  getWeekProducts, getYearProducts } = useGetProduct();

import { watch } from "vue";
import { useRoute } from "vue-router";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
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
    { immediate: true },
);

watch(() => searchProductForm.value.search, (search) => {
  if (search.length === 0) {
    products.value = [];
    seasonalSelections.value = [];
  }
});
</script>

<style scoped>

</style>