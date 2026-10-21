<template>
  <form action="" @submit.prevent="updateProductDesc(product)">
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
    <input type="file" @change="(e) => updateProductImages(product, e)"
           class="hidden"
           :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
  </form>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getProduct } from "@/features/use-product/api/get-product.ts";
import { useUpdateProduct } from "@/features/use-product-form/api/update-product.ts";
import { fileInput } from "@/shared/lib/product-helper.ts";

import UiButton from "@/shared/ui/button/UiButton.vue";
import EditImageUpload from "@/features/use-product-form/ui/EditImageUpload.vue";
import ProductBaseInfo from "@/entities/product-form/ui/ProductBaseInfo.vue";
import EditVariants from "@/features/use-product-form/ui/EditVariants.vue";

const { updateProductImages, updateProductDesc } = useUpdateProduct();

const route = useRoute();

const { data: product } = useQuery({
  queryKey: ['product', route.params.id],
  queryFn: () => getProduct(route.params.id),
})
</script>

<style scoped>

</style>