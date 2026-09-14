<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col shrink-0 lg:w-95 md:w-70 w-50">
      <BaseProductCard :product="product" :array="productYear" :size="'w-full h-50 md:h-70 lg:h-105'" />
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
import type {Product} from "@/features/use-product/model/product.types.ts";
import BaseProductCard from "@/widgets/BaseProductCard.vue";

defineProps<{
  product: Product
  productYear: Product[]
}>()
</script>

<style scoped>

</style>