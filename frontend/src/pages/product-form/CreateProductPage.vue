<template>
  <form action="" @submit.prevent="createProduct">
    <CreateImageUpload />
    <ProductBaseInfo />
    <CreateVariants />
    <div class="w-full mt-4 mb-6">
      <UiButton type="submit"
                  name="CREATE PRODUCT"
                  variant="useProduct" />
    </div>
    <input type="file" @change="onFilesSelected"
           class="hidden"
           :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
  </form>
</template>

<script setup lang="ts">
import { useAddProduct } from "@/features/use-product-form/api/create-product.ts";
import { fileInput, productHelper } from "@/shared/lib/product-helper.ts";

import UiButton from "@/shared/ui/button/UiButton.vue";
import CreateImageUpload from "@/features/use-product-form/ui/CreateImageUpload.vue";
import ProductBaseInfo from "@/entities/product-form/ui/ProductBaseInfo.vue";
import CreateVariants from "@/features/use-product-form/ui/CreateVariants.vue";

const { createProduct } = useAddProduct();
const { onFilesSelected } = productHelper();
</script>

<style scoped>

</style>