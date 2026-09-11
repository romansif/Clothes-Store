<template>
  <template v-if="product">
    <EditImageUpload :product="product" />
    <EditBasicInfo :product="product" />
    <EditVariants :product="product" />
  </template>
  <div class="w-full mt-4 mb-6">
    <BaseButton @click="updateProductDesc(product.id)" name="EDIT PRODUCT" variant="useProduct" />
  </div>
  <input type="file" @change="(e) => updateProductImages(product, e)" class="hidden"
         :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useUpdateProduct } from "@/features/use-product/api/update-product.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import EditImageUpload from "@/features/use-product-form/ui/EditImageUpload.vue";
import EditBasicInfo from "@/features/use-product-form/ui/EditBasicInfo.vue";
import EditVariants from "@/features/use-product-form/ui/EditVariants.vue";

const route = useRoute();

const { fileInput } = useProductsModals();
const { getProduct, product } = useGetProduct();
const { updateProductImages, updateProductDesc } = useUpdateProduct();

onMounted(async () => {
  await getProduct(route.params.id)
})
</script>

<style scoped>

</style>