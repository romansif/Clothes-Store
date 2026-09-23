<template>
  <div class="flex gap-18 lg:gap-20">
    <div class="flex flex-col items-center gap-3 w-97">
      <img :src="productInfoPreview(product)" alt="" class="w-97">
    </div>
    <div class="flex flex-col justify-between">
      <div v-for="(img, index) in angelCards(product)" :key="index" class="h-22 w-18">
        <img :src="img" alt=""
             class="h-22 w-18 opacity-70 cursor-pointer transition duration-400 hover:scale-110"
             @click="changeImg(product, index)">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import type {Product} from "@/shared/model/product.types.ts";

defineProps<{
  product: Product,
}>();

const { changeImg, productInfoPreview, angelCards } = productHelper();
</script>

<style scoped>

</style>