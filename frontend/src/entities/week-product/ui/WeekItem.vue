<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col shrink-0 lg:w-75 w-50">
      <BaseProductCard :product="product" :array="productWeek"
                       :size="'w-full h-50 md:h-60 lg:h-85'"
                       :stack-class="'absolute top-30 -left-12 text-6xl font-semibold -rotate-50 w-110'"
                       :favorite-btn="'absolute top-0.5 left-66.5 w-8 cursor-pointer'" />
      <span class="whitespace-normal mt-2 text-[#A3A3A3]">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-base">
        <span class="whitespace-normal">{{ product.title }}</span>
        <span class="font-dm-sans">$ {{ product.price }}</span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">

import type {Product} from "@/shared/model/product.types.ts";

defineProps<{
  product: Product
  productWeek: Product[]
}>()

import BaseProductCard from "@/widgets/base/BaseProductCard.vue";
</script>

<style scoped>

</style>