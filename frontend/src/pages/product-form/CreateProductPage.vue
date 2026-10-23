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
import { useAddProduct } from "@/features/create-product-form/api/create-product";
import { fileInput, productHelper } from "@/shared/lib/product-helper";

import { UiButton } from "@/shared/ui/button";
import { CreateImageUpload } from "@/features/use-product-form";
import { ProductBaseInfo } from "@/entities/product-form";
import { CreateVariants } from "@/features/use-product-form";

const { createProduct } = useAddProduct();
const { onFilesSelected } = productHelper();
</script>

<style scoped>

</style>