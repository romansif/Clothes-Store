<template>
  <TransitionGroup name="notify">
    <li @click="getProductId(product.id)" v-for="product in productsWeek" :key="product.id"
        class="flex flex-col shrink-0 lg:w-75 w-50">
      <div class="relative">
        <router-link :to="{name: 'product/info'}">
          <img :src="productPreview(product.id, productsWeek)" alt=""
               :class="productPreviewClass('w-full h-50 md:h-60 lg:h-78.25', product)" />
        </router-link>
        <span v-if="isOutOfStack(product)" class="absolute top-35 -left-2 text-5xl font-semibold -rotate-45">
            Out Of Stack
        </span>
      </div>
      <span class="whitespace-normal mt-2 text-[#A3A3A3]">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-base">
        <span class="whitespace-normal">{{ product.title }}</span>
        <span>$ {{ product.price }}</span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { productsWeek } = productStore();
const { getProductId } = productsApi();
const { isOutOfStack, productPreview } = productsCover();
const { productPreviewClass } = baseClasses();

import { baseClasses } from "@/shared/constants/base.classes.ts";
import { productsCover } from "@/shared/lib/product-image.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
</script>

<style scoped>

</style>