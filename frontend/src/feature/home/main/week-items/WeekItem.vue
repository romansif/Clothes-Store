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
const { productsWeek } = productsStore();
const { getProductId } = useProducts();
const { isOutOfStack, productPreview } = productsCover();
const { productPreviewClass } = baseClasses();

import { baseClasses } from "@/shared/composables/style/base.classes.ts";
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
</script>

<style scoped>

</style>