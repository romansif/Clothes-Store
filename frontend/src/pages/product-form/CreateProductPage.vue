<template>
  <form @submit.prevent="createProduct" action="">
    <CreateImageUpload />
    <CreateBasicInfo />
    <CreateVariants />
    <div class="w-full mt-4 mb-6">
      <BaseButton type="submit" name="CREATE PRODUCT" variant="useProduct" />
    </div>
    <input type="file" @change="onFilesSelected" class="hidden"
           :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
  </form>
</template>

<script setup lang="ts">
import { useAddProduct } from "@/features/use-product-form/api/add-product.ts";
import { fileInput } from "@/features/use-product-form/lib/toggle-image-product.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import CreateImageUpload from "@/features/use-product-form/ui/CreateImageUpload.vue";
import CreateBasicInfo from "@/features/use-product-form/ui/CreateBasicInfo.vue";
import CreateVariants from "@/features/use-product-form/ui/CreateVariants.vue";

const { createProduct, onFilesSelected } = useAddProduct();
</script>

<style scoped>

</style>