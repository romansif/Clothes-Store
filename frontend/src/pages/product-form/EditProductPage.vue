<template>
  <form action="" @submit.prevent="editProductInfo(product)">
    <template v-if="product?.id">
      <EditImageUpload :product="product" />
      <ProductBaseInfo :product="product" />
      <EditVariants :product="product" />
    </template>
    <div class="w-full mt-4 mb-6">
      <UiButton type="submit"
                  name="EDIT PRODUCT"
                  variant="useProduct" />
    </div>
    <input type="file" @change="(e) => editProductImages({product, event: e})"
           class="hidden"
           :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
  </form>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProductData } from "@/features/product-info/lib/use-product-data";
import { useEditProductImages, useEditProductInfo } from "@/features/product-edit-form/api/update-product";
import { fileInput } from "@/shared/lib/product-helper";
import { UiButton } from "@/shared/ui/button";
import { ProductBaseInfo } from "@/entities/product-form";
import { EditImageUpload, EditVariants } from "@/features/product-edit-form";

const route = useRoute();

const { editProductImages } = useEditProductImages();
const { editProductInfo } = useEditProductInfo()

const { product } = useProductData(route)
</script>
