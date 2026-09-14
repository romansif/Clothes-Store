<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col shrink-0 lg:w-80 w-50">
      <BaseProductCard :product="product" :array="autumnCatalog" :size="''" />
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
  autumnCatalog: Product[]
}>();

import BaseProductCard from "@/widgets/BaseProductCard.vue";

</script>

<style scoped>

</style>