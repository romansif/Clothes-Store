<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col">
      <BaseProductCard :product="product" :array="products"
                       :size="'w-[344.5px] h-45 sm:h-78.5 xl:h-100'"
                       :stack-class="'absolute top-42 -left-12 text-7xl font-semibold -rotate-50 w-110'"
                       :favorite-btn="'absolute top-0.5 left-78 w-8 cursor-pointer'" />
      <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-sm sm:text-lg">
        <span class="whitespace-normal w-20 sm:w-50">
          {{ product.title }}
        </span>
        <span class="font-dm-sans">
          $ {{ product.price }}
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type {Product} from "@/shared/model/product.types.ts";

import BaseProductCard from "@/widgets/base/BaseProductCard.vue";

defineProps<{
  product: Product,
  products: Product[],
}>();
</script>

<style scoped>

</style>