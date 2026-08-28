<template>
<router-view :key="product?.id" />
</template>

<script setup lang="ts">
const { getProduct } = productApi();
const { loading } = useBaseModals();
const { componentError } = errorHandler();
const { product, activeProductImg } = productStore();
const { productInfoPreview, useGetProducts } = productsCover();

import { useRoute } from "vue-router";
import { onErrorCaptured, onMounted, watch } from "vue";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { productsCover } from "@/features/use-product/model/use-product.ts";

const route = useRoute();

watch(
    () => route.params.id,
    async (newId) => {
      if (newId) {
        loading.value = true;
        await getProduct(newId as string);
        if(product.value && Array.isArray(product.value.images) && product.value.images[0]) {
          activeProductImg.value = productInfoPreview(product.value) ?? '';
        }
        loading.value = false;
      }
    },
    { immediate: true }
);

onErrorCaptured((err, info) => {
  console.error("Перехвачена ошибка в дочернем компоненте:", err);
  console.log("Детали ошибки:", info);

  componentError.value = "An error occurred while displaying the product catalog."

  return false
});

onMounted(async () => {
  loading.value = true;

  await useGetProducts();

  if(route.params.id){
    await getProduct(route.params.id as string);
  }

  loading.value = false;
});
</script>

<style scoped>

</style>