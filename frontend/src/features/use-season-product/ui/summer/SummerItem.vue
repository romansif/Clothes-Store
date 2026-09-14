<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col shrink-0 lg:w-80 w-50">
      <BaseProductCard :product="product" :array="summerCatalog"
                       :size="''"
                       :stack-class="'absolute top-35 -left-8 text-6xl font-semibold -rotate-50 w-110'"
                       :favorite-btn="'absolute top-0.5 left-71.5 w-8 cursor-pointer'" />
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
import type {Product} from "@/features/use-product/model/product.types.ts";

defineProps<{
  product: Product
  summerCatalog: Product[]
}>();

import BaseProductCard from "@/widgets/ui/BaseProductCard.vue";
</script>

<style scoped>

</style>