<template>
  <form action="" @submit.prevent="updateProductDesc(product)">
    <template v-if="product?.id">
      <EditImageUpload :product="product" />
      <EditBasicInfo :product="product" />
      <EditVariants :product="product" />
    </template>
    <div class="w-full mt-4 mb-6">
      <BaseButton type="submit"
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
import { fileInput } from "@/shared/lib/helper/product-helper.ts";

import BaseButton from "@/shared/ui/base/BaseButton.vue";
import EditImageUpload from "@/features/use-product-form/ui/EditImageUpload.vue";
import EditBasicInfo from "@/entities/product-form/ui/EditBasicInfo.vue";
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