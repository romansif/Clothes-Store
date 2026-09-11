<template>
  <CreateImageUpload />
  <CreateBasicInfo />
  <CreateVariants />
  <div class="w-full mt-4 mb-6">
    <BaseButton @click="createProduct" name="CREATE PRODUCT" variant="useProduct" />
  </div>
  <input type="file" @change="onFilesSelected" class="hidden"
         :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
</template>

<script setup lang="ts">
import { useAddProduct } from "@/features/use-product/api/add-product.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import CreateImageUpload from "@/features/use-profile/ui/create-product/CreateImageUpload.vue";
import CreateBasicInfo from "@/features/use-profile/ui/create-product/CreateBasicInfo.vue";
import CreateVariants from "@/features/use-profile/ui/create-product/CreateVariants.vue";

const { fileInput } = useProductsModals();
const { createProduct, onFilesSelected } = useAddProduct();
</script>

<style scoped>

</style>